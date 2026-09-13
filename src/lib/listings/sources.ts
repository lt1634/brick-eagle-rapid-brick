export type HuntSource = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  kind: "sale" | "rent" | "agent" | "estate";
};

export const HUNT_SOURCES: HuntSource[] = [
  {
    id: "28-sale",
    name: "28Hse 梅窩售盤",
    blurb: "屋網即時搜尋 · Mui Wo",
    href: "https://www.28hse.com/buy?form_data=searchText%3DMui+Wo",
    kind: "sale",
  },
  {
    id: "28-rent",
    name: "28Hse 梅窩租盤",
    blurb: "屋網即時搜尋 · Mui Wo",
    href: "https://www.28hse.com/rent?form_data=searchText%3DMui+Wo",
    kind: "rent",
  },
  {
    id: "28-village",
    name: "28Hse 南大嶼山村屋",
    blurb: "離島村屋，入去再睇梅窩／橫塘／鹿地塘",
    href: "https://www.28hse.com/buy/apartment?buyRent=buy&cat_ids=4781&locations=%5B%2262%22%2C%22islands%22%5D",
    kind: "sale",
  },
  {
    id: "28-scenic",
    name: "28Hse 卓濤軒",
    blurb: "你而家屋苑嘅放盤同租盤",
    href: "https://www.28hse.com/buy?form_data=searchText%3D%E5%8D%93%E6%BF%A4%E8%BB%92",
    kind: "estate",
  },
  {
    id: "sp-sale",
    name: "千居 Spacious 售盤",
    blurb: "梅窩全區買樓",
    href: "https://www.spacious.hk/zh-tw/%E9%A6%99%E6%B8%AF/n/137-%E6%A2%85%E7%AA%A9/%E8%B2%B7%E6%A8%93",
    kind: "sale",
  },
  {
    id: "sp-rent",
    name: "千居 Spacious 租盤",
    blurb: "梅窩全區租屋",
    href: "https://www.spacious.hk/zh-tw/%E9%A6%99%E6%B8%AF/n/137-%E6%A2%85%E7%AA%A9/%E7%A7%9F%E5%B1%8B",
    kind: "rent",
  },
  {
    id: "hs-sale",
    name: "HomeSolutions 售盤",
    blurb: "南大嶼山專營代理 · 村屋最多",
    href: "https://homesolutions.hk/for-sale/",
    kind: "sale",
  },
  {
    id: "hs-rent",
    name: "HomeSolutions 租盤",
    blurb: "南大嶼山專營代理 · 村屋租盤",
    href: "https://homesolutions.hk/rent/",
    kind: "rent",
  },
  {
    id: "four-seasons",
    name: "四季物業 Tiffany",
    blurb: "梅窩舖頭代理 · 牌照 E-389063",
    href: "https://www.28hse.com/agent/1745",
    kind: "agent",
  },
  {
    id: "findley",
    name: "範梁集團",
    blurb: "銀運路海景大廈地下 · 梅窩本地盤",
    href: "https://www.28hse.com/agent/5907",
    kind: "agent",
  },
  {
    id: "midland",
    name: "美聯 卓濤軒成交",
    blurb: "2座 3樓 D 2026-06 成交 $348萬",
    href: "https://www.midland.com.hk/zh-hk/estate/%E6%96%B0%E7%95%8C-%E5%A4%A7%E5%B6%BC%E5%B1%B1%E5%8D%97-%E5%8D%93%E6%BF%A4%E8%BB%92-E00183",
    kind: "estate",
  },
  {
    id: "centanet",
    name: "中原 大嶼山",
    blurb: "中原分區樓盤",
    href: "https://hk.centanet.com/findproperty/list/buy?q=6OtYqumAmg",
    kind: "sale",
  },
];
