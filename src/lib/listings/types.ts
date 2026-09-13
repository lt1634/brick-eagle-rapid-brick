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

export const OWN_HOME = {
  name: "卓濤軒",
  block: "2座",
  floor: "1樓",
  flat: "D室",
  address: "梅窩碼頭路18A號",
  buyPrice: 4_150_000,
  sqft: 350,
  extra: "連平台",
  boughtLabel: "購入 $415萬 · 350呎連平台",
  comps: [
    {
      label: "2座 3樓 D室",
      date: "2026-06-23",
      price: 3_480_000,
      sqft: 354,
      note: "註冊處成交，同座同室向、連平台",
      url: "https://www.midland.com.hk/zh-hk/estate/%E6%96%B0%E7%95%8C-%E5%A4%A7%E5%B6%BC%E5%B1%B1%E5%8D%97-%E5%8D%93%E6%BF%A4%E8%BB%92-E00183",
    },
  ],
} as const;

export const DEFAULT_CRITERIA: Criteria = {
  maxSale: 4_000_000,
  minAptSqft: 401,
  minVillageSqft: 700,
  maxRent: 20_000,
  excludeHos: true,
  muiWoOnly: true,
};
