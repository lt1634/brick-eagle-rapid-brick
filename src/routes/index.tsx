import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  Compass,
  Copy,
  Home,
  RefreshCw,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ListingCard } from "@/components/listing-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatSqft, telegramShareUrl } from "@/lib/format";
import { loadListings } from "@/lib/listings/functions";
import { isHos, matchLevel } from "@/lib/listings/score";
import { SEED_LISTINGS } from "@/lib/listings/seed";
import { HUNT_SOURCES } from "@/lib/listings/sources";
import { type Criteria, type Listing } from "@/lib/listings/types";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: HomePage });

const TABS = [
  { id: "match", label: "筍盤" },
  { id: "sale", label: "售盤" },
  { id: "rent", label: "租盤" },
  { id: "saved", label: "心水" },
  { id: "sources", label: "盤源" },
] as const;

function HomePage() {
  const { tab, setTab, criteria, setCriteria, saved, toggleSaved } = useAppState();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    void useAppState.persist.rehydrate();
  }, []);

  const listingsQuery = useQuery({
    queryKey: ["listings"],
    queryFn: () => loadListings({ data: { force: false } }),
    placeholderData: {
      listings: SEED_LISTINGS,
      fetchedAt: "",
      live: false,
      sources: [],
    },
  });

  const refresh = useMutation({
    mutationFn: () => loadListings({ data: { force: true } }),
    onSuccess: (data) => {
      queryClient.setQueryData(["listings"], data);
      toast.success(data.live ? "已更新網上放盤" : "暫時用上次資料");
    },
    onError: () => toast.error("更新失敗，保留而家嘅盤"),
  });

  const listings = listingsQuery.data?.listings ?? SEED_LISTINGS;
  const fetchedAt = listingsQuery.data?.fetchedAt;
  const live = listingsQuery.data?.live ?? false;

  const visible = useMemo(() => {
    let rows = listings.filter((l) => !isHos(l));
    if (tab === "sale") rows = rows.filter((l) => l.deal === "sale");
    if (tab === "rent") rows = rows.filter((l) => l.deal === "rent");
    if (tab === "saved") rows = rows.filter((l) => saved.includes(l.id));
    if (tab === "match") {
      rows = rows.filter((l) => {
        const m = matchLevel(l, criteria);
        return m === "fit" || m === "close";
      });
    }
    return [...rows].sort((a, b) => rank(a, criteria) - rank(b, criteria));
  }, [listings, tab, saved, criteria]);

  const fitCount = listings.filter((l) => matchLevel(l, criteria) === "fit").length;
  const digest = buildDigest(listings.filter((l) => matchLevel(l, criteria) === "fit"));

  return (
    <div className="horizon min-h-dvh pb-24">
      <header className="mx-auto max-w-5xl px-4 pb-4 pt-6 sm:pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
          Silvermine Bay
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              梅窩換樓
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
              只睇梅窩。村屋 700 呎；買盤低過 $400萬、大於 400 呎。居屋自動剔除。
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => refresh.mutate()}
              disabled={refresh.isPending}
            >
              <RefreshCw className={refresh.isPending ? "animate-spin" : undefined} />
              更新
            </Button>
            <Button asChild>
              <a
                href={telegramShareUrl(
                  "https://www.spacious.hk/zh-tw/%E9%A6%99%E6%B8%AF/n/137-%E6%A2%85%E7%AA%A9",
                  digest,
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Send />
                傳去 TG
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-subtle">
          <Badge variant={live ? "match" : "muted"}>{live ? "網上即時" : "備用資料"}</Badge>
          <span>{fitCount} 個合條件</span>
          {fetchedAt ? <span>更新於 {formatFetched(fetchedAt)}</span> : null}
        </div>
      </header>

      <div className="sticky top-0 z-20 border-y border-border/70 bg-bg/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 py-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "h-10 shrink-0 rounded-md px-3.5 text-sm font-medium transition-colors",
                tab === t.id ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2",
              )}
            >
              {t.label}
              {t.id === "saved" && saved.length ? (
                <span className="ml-1.5 tabular-nums">{saved.length}</span>
              ) : null}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="ml-auto flex h-10 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm text-muted hover:bg-surface-2"
          >
            <SlidersHorizontal className="size-4" />
            條件
          </button>
        </nav>
      </div>

      {filtersOpen ? (
        <section className="mx-auto grid max-w-5xl gap-4 px-4 py-4 sm:grid-cols-2">
          <FilterField
            label={`買盤上限 ${formatPrice(criteria.maxSale, "sale")}`}
            value={criteria.maxSale}
            min={2_000_000}
            max={8_000_000}
            step={100_000}
            onChange={(v) => setCriteria({ maxSale: v })}
          />
          <FilterField
            label={`私人樓最少 ${criteria.minAptSqft} 呎`}
            value={criteria.minAptSqft}
            min={250}
            max={800}
            step={10}
            onChange={(v) => setCriteria({ minAptSqft: v })}
          />
          <FilterField
            label={`村屋最少 ${criteria.minVillageSqft} 呎`}
            value={criteria.minVillageSqft}
            min={400}
            max={1400}
            step={50}
            onChange={(v) => setCriteria({ minVillageSqft: v })}
          />
          <FilterField
            label={`租金上限 $${criteria.maxRent.toLocaleString("en-HK")}`}
            value={criteria.maxRent}
            min={8_000}
            max={40_000}
            step={500}
            onChange={(v) => setCriteria({ maxRent: v })}
          />
        </section>
      ) : null}

      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === "sources" ? (
          <SourcesPanel onCopy={() => copyDigest(digest)} digest={digest} />
        ) : visible.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {visible.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                criteria={criteria}
                saved={saved.includes(listing.id)}
                onToggleSave={() => toggleSaved(listing.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function formatFetched(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hk = new Date(d.getTime() + 8 * 3600_000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${hk.getUTCMonth() + 1}/${hk.getUTCDate()} ${pad(hk.getUTCHours())}:${pad(hk.getUTCMinutes())}`;
}

function rank(listing: Listing, criteria: Criteria) {
  const m = matchLevel(listing, criteria);
  const base = m === "fit" ? 0 : m === "close" ? 100 : 200;
  const price = listing.price ?? 9e12;
  return base + (listing.deal === "sale" ? price / 1e6 : price / 1e3);
}


function FilterField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block rounded-lg border border-border bg-raised p-3">
      <span className="text-sm text-muted">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-primary"
      />
    </label>
  );
}

function SourcesPanel({ onCopy, digest }: { onCopy: () => void; digest: string }) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={onCopy}>
          <Copy />
          複製合條件摘要
        </Button>
        <Button asChild variant="outline">
          <a href={telegramShareUrl("https://www.28hse.com/buy?form_data=searchText%3DMui+Wo", digest)} target="_blank" rel="noreferrer">
            <Send />
            傳去 Telegram
          </a>
        </Button>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {HUNT_SOURCES.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col rounded-xl border border-border bg-raised p-4 shadow-card transition-colors hover:border-border-strong"
            >
              <span className="text-xs uppercase tracking-wider text-subtle">
                {s.kind === "agent" ? "代理" : s.kind === "estate" ? "屋苑" : s.kind === "rent" ? "租" : "售"}
              </span>
              <span className="mt-1 font-display text-lg">{s.name}</span>
              <span className="mt-1 text-sm text-muted">{s.blurb}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState({ tab }: { tab: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong bg-raised px-6 py-16 text-center">
      {tab === "saved" ? (
        <>
          <Bookmark className="mx-auto size-6 text-subtle" />
          <p className="mt-3 font-display text-xl">未有心水</p>
          <p className="mt-1 text-sm text-muted">喺盤上面撳書籤，之後可以一齊傳去 Telegram。</p>
        </>
      ) : (
        <>
          <Compass className="mx-auto size-6 text-subtle" />
          <p className="mt-3 font-display text-xl">呢頁暫時無盤</p>
          <p className="mt-1 text-sm text-muted">試下放寬條件，或者去「盤源」開代理網站。</p>
        </>
      )}
    </div>
  );
}

function buildDigest(listings: Listing[]): string {
  const sales = listings.filter((l) => l.deal === "sale");
  const rents = listings.filter((l) => l.deal === "rent");
  const line = (l: Listing) =>
    `• ${l.estate || l.title} ${l.sqft ? formatSqft(l.sqft) : ""} ${l.price ? formatPrice(l.price, l.deal) : ""} ${l.url}`;
  return [
    "梅窩合條件盤（唔要居屋）",
    sales.length ? "【售】" : "",
    ...sales.map(line),
    rents.length ? "【租】" : "",
    ...rents.map(line),
  ]
    .filter(Boolean)
    .join("\n");
}

async function copyDigest(digest: string) {
  try {
    await navigator.clipboard.writeText(digest);
    toast.success("已複製，可以貼去 Telegram");
  } catch {
    toast.error("複製失敗");
  }
}
