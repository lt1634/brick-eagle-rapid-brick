export type DealType = "sale" | "rent";
export type ListingKind = "village" | "apartment" | "shop" | "unknown";

export type Listing = {
  id: string;
  source: string;
  deal: DealType;
  url: string;
  title: string;
  estate: string;
  unit: string;
  sqft: number | null;
  price: number | null;
  beds: number | null;
  baths: number | null;
  agent: string;
  image: string | null;
  tags: string[];
  posted: string | null;
  kind: ListingKind;
  areaLabel: string;
};

export type SourceHealth = {
  source: string;
  ok: boolean;
  count: number;
  error?: string;
};

export type ListingsPayload = {
  listings: Listing[];
  fetchedAt: string;
  live: boolean;
  sources: SourceHealth[];
};

export type Criteria = {
  maxSale: number;
  minAptSqft: number;
  minVillageSqft: number;
  maxRent: number;
  excludeHos: boolean;
  muiWoOnly: boolean;
};


export const DEFAULT_CRITERIA: Criteria = {
  maxSale: 10_000_000,
  minAptSqft: 401,
  minVillageSqft: 700,
  maxRent: 20_000,
  excludeHos: true,
  muiWoOnly: true,
};
