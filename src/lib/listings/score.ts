import {
  DEFAULT_CRITERIA,
  OWN_HOME,
  type Criteria,
  type Listing,
} from "./types";

const MUI_WO_YES =
  /梅窩|mui\s*wo|卓濤軒|scenic\s*crest|海灣樓|harbour\s*view|海愉花園|sea\s*crest|梅窩中心|福安閣|家樂閣|lucky\s*court|銀濤軒|華林|銀河灣畔|riverwalk|橫塘|wang\s*tong|鹿地塘|luk\s*tei|白銀鄉|pak\s*ngan|大地塘|tai\s*tei|麻布|稔埔|涌口|chung\s*hau|銀礦|silvermine|銀輝|銀寶|銀礦中心|美軒閣|nagan\s*wan|ngan\s*wan|scenic|muiwo/i;

const MUI_WO_NO =
  /貝澳|pui\s*o|長沙|cheung\s*sha|塘福|tong\s*fuk|大澳|tai\s*o|水口|shui\s*hau|南涌|nam\s*chung|芝麻灣|ham\s*tin|cheung\s*chau|tung\s*chung|sea\s*ranch|坪洲|peng\s*chau|shap\s*long|石壁|shek\s*pik|長洲|南丫|lamma|discovery\s*bay|愉景灣|東涌/i;

const HOS_RE = /銀河苑|ngan\s*ho|居屋|["“”]?hos["“”]?|home\s*ownership/i;

export function blobOf(listing: Listing): string {
  return [
    listing.title,
    listing.estate,
    listing.unit,
    listing.areaLabel,
    listing.tags.join(" "),
    listing.url,
  ].join(" ");
}

export function isHos(listing: Listing): boolean {
  return HOS_RE.test(blobOf(listing));
}

export function isMuiWo(listing: Listing): boolean {
  const text = blobOf(listing);
  if (MUI_WO_NO.test(text) && !/梅窩|mui\s*wo|卓濤軒/i.test(text)) return false;
  if (MUI_WO_NO.test(text) && !MUI_WO_YES.test(text)) return false;
  return MUI_WO_YES.test(text);
}

export function unitPrice(listing: Listing): number | null {
  if (!listing.price || !listing.sqft) return null;
  return Math.round(listing.price / listing.sqft);
}

export type MatchLevel = "fit" | "close" | "out";

export function matchLevel(
  listing: Listing,
  criteria: Criteria = DEFAULT_CRITERIA,
): MatchLevel {
  if (criteria.muiWoOnly && !isMuiWo(listing)) return "out";
  if (criteria.excludeHos && isHos(listing)) return "out";
  if (listing.deal === "sale") {
    if (listing.price == null || listing.price >= criteria.maxSale) {
      if (
        listing.price != null &&
        listing.price <= criteria.maxSale * 1.15 &&
        sizeOk(listing, criteria)
      ) {
        return "close";
      }
      return "out";
    }
    if (!sizeOk(listing, criteria)) {
      if (listing.kind === "village" && (listing.sqft ?? 0) >= 600) return "close";
      if (listing.kind !== "village" && (listing.sqft ?? 0) >= 350) return "close";
      return "out";
    }
    return "fit";
  }
  // rent
  if (listing.price != null && listing.price > criteria.maxRent) return "out";
  if (listing.kind === "village") {
    if ((listing.sqft ?? 0) >= criteria.minVillageSqft) return "fit";
    if ((listing.sqft ?? 0) >= 600) return "close";
    return "out";
  }
  if ((listing.sqft ?? 0) >= criteria.minAptSqft) return "fit";
  if ((listing.sqft ?? 0) >= 350) return "close";
  return "out";
}

function sizeOk(listing: Listing, criteria: Criteria): boolean {
  const sqft = listing.sqft ?? 0;
  if (listing.kind === "village") return sqft >= criteria.minVillageSqft;
  return sqft > criteria.minAptSqft - 1 && sqft >= criteria.minAptSqft;
}

export function swapDelta(listing: Listing) {
  const extraSqft =
    listing.sqft != null ? listing.sqft - OWN_HOME.sqft : null;
  const vsBuy =
    listing.deal === "sale" && listing.price != null
      ? listing.price - OWN_HOME.buyPrice
      : null;
  const vsComp =
    listing.deal === "sale" && listing.price != null
      ? listing.price - OWN_HOME.comps[0].price
      : null;
  return { extraSqft, vsBuy, vsComp };
}

export function ownUnitPrice(): number {
  return Math.round(OWN_HOME.buyPrice / OWN_HOME.sqft);
}
