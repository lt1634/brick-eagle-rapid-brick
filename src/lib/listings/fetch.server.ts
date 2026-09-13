import { isMuiWo } from "./score";
import { SEED_LISTINGS } from "./seed";
import type { Listing, ListingKind, ListingsPayload, SourceHealth } from "./types";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

async function getHtml(url: string, ms = 12000): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "zh-HK,zh-TW;q=0.9,en;q=0.8",
    },
    signal: AbortSignal.timeout(ms),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&#8211;/g, "–")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseBedsBaths(tags: string[]): { beds: number | null; baths: number | null } {
  const blob = tags.join(" ");
  const beds = blob.match(/(\d+)\s*房/) ?? blob.match(/(\d+(?:\.\d+)?)\s*Bed/i);
  const baths = blob.match(/(\d+)\s*浴/) ?? blob.match(/(\d+(?:\.\d+)?)\s*Bath/i);
  return {
    beds: beds ? Number(beds[1]) : null,
    baths: baths ? Number(baths[1]) : null,
  };
}

function kindFrom(text: string, tags: string[]): ListingKind {
  const blob = `${text} ${tags.join(" ")}`.toLowerCase();
  if (/店舖|shop|cockloft/.test(blob)) return "shop";
  if (/村屋|village/.test(blob)) return "village";
  if (/獨立屋|洋樓|大廈|apartment|flat/.test(blob)) return "apartment";
  return "unknown";
}

function parse28(html: string, deal: "sale" | "rent"): Listing[] {
  const blocks = html.split(/<div class="item property_item/);
  const out: Listing[] = [];
  const seen = new Set<string>();
  for (const b of blocks.slice(1)) {
    const m = b.match(
      /href="(https:\/\/www\.28hse\.com\/(?:buy|rent)\/[^"]*property-(\d+))"/,
    );
    if (!m) continue;
    const url = m[1];
    const pid = m[2];
    const id = `28hse-${pid}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const title = b.match(/class="detail_page"[^>]*>([^<]+)<\/a>/);
    const estate = b.match(/\/c\d+"[^>]*>([^<]+)<\/a>/);
    const unit = b.match(/class="unit_desc">([^<]+)/);
    const area = b.match(/實用面積:\s*([\d,]+)\s*呎/);
    const priceM = b.match(/(?:售|租)\s*\$?\s*([\d,.]+)\s*(萬元|元)/);
    const company = b.match(/companyName"[^>]*>[\s\S]*?<\/i>\s*([^<]+)/);
    const img = b.match(/src="(https:\/\/i1\.28hse\.com\/[^"]+)"/);
    const tags = [...b.matchAll(/<div class="ui\s+label">([^<]+)<\/div>/g)].map((x) =>
      decode(x[1]),
    );
    const posted = b.match(/(\d+\s*(?:日前|個月前|小時前|分鐘前)\s*刊登)/);
    const district = b.match(/南大嶼山|大嶼山|離島/);
    let price: number | null = null;
    if (priceM) {
      const n = Number(priceM[1].replace(/,/g, ""));
      price = priceM[2] === "萬元" ? Math.round(n * 10_000) : Math.round(n);
    }
    const titleText = decode(title?.[1] ?? "");
    const estateText = decode(estate?.[1] ?? "");
    const { beds, baths } = parseBedsBaths(tags);
    out.push({
      id,
      source: "28Hse",
      deal,
      url,
      title: titleText,
      estate: estateText,
      unit: decode(unit?.[1] ?? ""),
      sqft: area ? Number(area[1].replace(/,/g, "")) : null,
      price,
      beds,
      baths,
      agent: decode(company?.[1] ?? ""),
      image: img ? img[1].replace("_thumb", "_large") : null,
      tags,
      posted: posted?.[1] ?? null,
      kind: kindFrom(`${titleText} ${estateText}`, tags),
      areaLabel: district?.[0] ?? "南大嶼山",
    });
  }
  return out;
}

function parseHs(html: string, fallbackDeal: "sale" | "rent"): Listing[] {
  const blocks = html.split(/<div class="property-item">/);
  const out: Listing[] = [];
  const seen = new Set<string>();
  for (const b of blocks.slice(1)) {
    const m = b.match(/href="(https:\/\/homesolutions\.hk\/property-listing\/([^"/]+)\/?)"/);
    if (!m) continue;
    const url = m[1].endsWith("/") ? m[1] : `${m[1]}/`;
    const id = `hs-${m[2]}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const title = b.match(/property-title[^>]*>\s*<a[^>]+>\s*([^<]+)/);
    const million = b.match(/HK\$\s*(?:&nbsp;)?\s*([\d.]+)\s*Million/i);
    const rent = b.match(/HK\$\s*(?:&nbsp;)?\s*([\d,]+)(?!\s*Million)/i);
    const feats = [...b.matchAll(/<span>\s*([^<]+?)\s*<\/span>/g)].map((x) =>
      decode(x[1]),
    );
    const img = b.match(/<img[^>]+src="(https:\/\/homesolutions\.hk\/wp-content\/[^"]+)"/);
    const titleText = decode(title?.[1] ?? "");
    let deal: "sale" | "rent" = fallbackDeal;
    let price: number | null = null;
    if (million) {
      price = Math.round(Number(million[1]) * 1_000_000);
      deal = "sale";
    } else if (rent) {
      price = Number(rent[1].replace(/,/g, ""));
      deal = "rent";
    }
    let sqft: number | null = null;
    let beds: number | null = null;
    let baths: number | null = null;
    for (const f of feats) {
      if (/sq\s*ft/i.test(f)) {
        const n = f.match(/([\d,]+)/);
        if (n) sqft = Number(n[1].replace(/,/g, ""));
      } else if (/bed/i.test(f)) {
        const n = f.match(/([\d.]+)/);
        if (n) beds = Number(n[1]);
      } else if (/bath/i.test(f)) {
        const n = f.match(/([\d.]+)/);
        if (n) baths = Number(n[1]);
      }
    }
    out.push({
      id,
      source: "HomeSolutions",
      deal,
      url,
      title: titleText,
      estate: titleText,
      unit: "",
      sqft,
      price,
      beds,
      baths,
      agent: "HomeSolutions",
      image: img?.[1] ?? null,
      tags: feats.slice(0, 4),
      posted: null,
      kind: kindFrom(titleText, feats),
      areaLabel: "南大嶼山",
    });
  }
  return out;
}

const SEARCHES: { url: string; deal: "sale" | "rent"; parser: "28" | "hs"; name: string }[] = [
  {
    name: "28Hse 售 · Mui Wo",
    parser: "28",
    deal: "sale",
    url: "https://www.28hse.com/buy?form_data=searchText%3DMui+Wo",
  },
  {
    name: "28Hse 租 · Mui Wo",
    parser: "28",
    deal: "rent",
    url: "https://www.28hse.com/rent?form_data=searchText%3DMui+Wo",
  },
  {
    name: "28Hse 售 · 卓濤軒",
    parser: "28",
    deal: "sale",
    url: "https://www.28hse.com/buy?form_data=searchText%3D%E5%8D%93%E6%BF%A4%E8%BB%92",
  },
  {
    name: "28Hse 租 · 卓濤軒",
    parser: "28",
    deal: "rent",
    url: "https://www.28hse.com/rent?form_data=searchText%3D%E5%8D%93%E6%BF%A4%E8%BB%92",
  },
  {
    name: "28Hse 售 · 梅窩村屋",
    parser: "28",
    deal: "sale",
    url: "https://www.28hse.com/buy?form_data=searchText%3D%E6%A2%85%E7%AA%A9%E6%9D%91%E5%B1%8B",
  },
  {
    name: "28Hse 租 · 梅窩村屋",
    parser: "28",
    deal: "rent",
    url: "https://www.28hse.com/rent?form_data=searchText%3D%E6%A2%85%E7%AA%A9%E6%9D%91%E5%B1%8B",
  },
  {
    name: "28Hse 售 · 橫塘",
    parser: "28",
    deal: "sale",
    url: "https://www.28hse.com/buy?form_data=searchText%3D%E6%A9%AB%E5%A1%98",
  },
  {
    name: "28Hse 售 · 鹿地塘",
    parser: "28",
    deal: "sale",
    url: "https://www.28hse.com/buy?form_data=searchText%3D%E9%B9%BF%E5%9C%B0%E5%A1%98",
  },
  {
    name: "28Hse 南大嶼山村屋售",
    parser: "28",
    deal: "sale",
    url: "https://www.28hse.com/buy/apartment?buyRent=buy&cat_ids=4781&locations=%5B%2262%22%2C%22islands%22%5D",
  },
  {
    name: "28Hse 南大嶼山村屋租",
    parser: "28",
    deal: "rent",
    url: "https://www.28hse.com/rent/apartment?buyRent=rent&cat_ids=4781&locations=%5B%2262%22%2C%22islands%22%5D",
  },
  {
    name: "HomeSolutions 售",
    parser: "hs",
    deal: "sale",
    url: "https://homesolutions.hk/for-sale/",
  },
  {
    name: "HomeSolutions 租",
    parser: "hs",
    deal: "rent",
    url: "https://homesolutions.hk/rent/",
  },
];

function merge(listings: Listing[]): Listing[] {
  const map = new Map<string, Listing>();
  for (const l of listings) {
    if (!l.title && !l.estate) continue;
    if (l.kind === "shop") continue;
    const prev = map.get(l.id);
    if (!prev) {
      map.set(l.id, l);
      continue;
    }
    map.set(l.id, {
      ...prev,
      ...l,
      image: l.image || prev.image,
      agent: l.agent || prev.agent,
      tags: [...new Set([...prev.tags, ...l.tags])],
    });
  }
  return [...map.values()].filter(isMuiWo);
}

let cache: { at: number; payload: ListingsPayload } | null = null;
const TTL = 15 * 60 * 1000;

export async function collectListings(force = false): Promise<ListingsPayload> {
  if (!force && cache && Date.now() - cache.at < TTL) return cache.payload;

  const sources: SourceHealth[] = [];
  const collected: Listing[] = [];

  const results = await Promise.allSettled(
    SEARCHES.map(async (s) => {
      const html = await getHtml(s.url);
      const items = s.parser === "28" ? parse28(html, s.deal) : parseHs(html, s.deal);
      return { name: s.name, items };
    }),
  );

  for (const r of results) {
    if (r.status === "fulfilled") {
      sources.push({ source: r.value.name, ok: true, count: r.value.items.length });
      collected.push(...r.value.items);
    } else {
      sources.push({
        source: "source",
        ok: false,
        count: 0,
        error: r.reason instanceof Error ? r.reason.message : "fail",
      });
    }
  }

  const live = merge(collected);
  const liveIds = new Set(live.map((l) => l.id));
  const extras = SEED_LISTINGS.filter((s) => !liveIds.has(s.id) && isMuiWo(s));
  // Prefer live copy; keep seed-only rows so a partial scrape still has coverage.
  const listings = merge([...live, ...extras]);
  const payload: ListingsPayload = {
    listings,
    fetchedAt: new Date().toISOString(),
    live: live.length > 0,
    sources,
  };
  cache = { at: Date.now(), payload };
  return payload;
}
