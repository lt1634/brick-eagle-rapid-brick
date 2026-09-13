import { i as __toESM } from "../_runtime.mjs";
import { a as matchLevel, c as unitPrice, n as OWN_HOME, o as ownUnitPrice, r as isHos, s as swapDelta, t as DEFAULT_CRITERIA } from "./score-BjjZcf1j.mjs";
import { t as SEED_LISTINGS } from "./seed-BQmXIfqQ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as House, c as Compass, i as RefreshCw, l as Bookmark, n as SlidersHorizontal, o as ExternalLink, r as Send, s as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CkVEwaxA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-primary text-primary-fg",
		outline: "border border-border text-muted",
		match: "bg-primary/12 text-primary",
		close: "bg-close/12 text-close",
		muted: "bg-surface-2 text-muted"
	} },
	defaultVariants: { variant: "outline" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,opacity,background-color] duration-[var(--motion-fast,250ms)] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-92",
			outline: "border border-border bg-raised text-fg hover:border-border-strong",
			ghost: "text-fg hover:bg-surface-2/60",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-md px-5 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function formatPrice(n, deal) {
	if (deal === "rent") return `$${n.toLocaleString("en-HK")}`;
	const wan = n / 1e4;
	if (Number.isInteger(wan)) return `$${wan}萬`;
	return `$${wan.toFixed(wan >= 100 ? 0 : 1)}萬`;
}
function formatDelta(n, deal) {
	const sign = n > 0 ? "+" : n < 0 ? "−" : "";
	const abs = Math.abs(n);
	if (deal === "rent") return `${sign}$${abs.toLocaleString("en-HK")}`;
	const wan = abs / 1e4;
	return `${sign}$${Number.isInteger(wan) ? `${wan}萬` : `${wan.toFixed(1)}萬`}`;
}
function formatSqft(n) {
	return `${n.toLocaleString("en-HK")}呎`;
}
function telegramShareUrl(url, text) {
	const u = new URL("https://t.me/share/url");
	u.searchParams.set("url", url);
	u.searchParams.set("text", text);
	return u.toString();
}
var MATCH_LABEL = {
	fit: "合條件",
	close: "接近",
	out: "未合"
};
function ListingCard({ listing, criteria, saved, onToggleSave }) {
	const level = matchLevel(listing, criteria);
	const delta = swapDelta(listing);
	const psf = unitPrice(listing);
	const shareText = [
		listing.deal === "sale" ? "售" : "租",
		listing.estate || listing.title,
		listing.sqft ? formatSqft(listing.sqft) : "",
		listing.price ? formatPrice(listing.price, listing.deal) : "",
		listing.url
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl border border-border bg-raised shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-40 overflow-hidden bg-surface-2",
			children: [listing.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: listing.image,
				alt: "",
				className: "size-full object-cover",
				loading: "lazy",
				referrerPolicy: "no-referrer"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-full items-end bg-[radial-gradient(80%_60%_at_20%_0%,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_55%),linear-gradient(180deg,#d7e4dc,var(--color-surface-2))] px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-primary",
					children: listing.estate || "梅窩"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 top-3 flex gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: level === "fit" ? "match" : level === "close" ? "close" : "muted",
						children: MATCH_LABEL[level]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "muted",
						children: listing.deal === "sale" ? "售" : "租"
					}),
					listing.kind === "village" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "村屋"
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-lg font-medium leading-snug",
							children: listing.estate || listing.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 truncate text-sm text-muted",
							children: [listing.title, listing.unit ? ` · ${listing.unit}` : ""]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "shrink-0 text-right font-display text-xl font-medium tabular-nums leading-none",
						children: [listing.price ? formatPrice(listing.price, listing.deal) : "—", listing.deal === "rent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block pt-1 text-xs font-sans text-subtle",
							children: "／月"
						}) : null]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums text-muted",
					children: [
						listing.sqft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatSqft(listing.sqft) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "面積未列" }),
						psf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["@", psf.toLocaleString("en-HK")] }) : null,
						listing.beds ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [listing.beds, "房"] }) : null,
						listing.baths ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [listing.baths, "浴"] }) : null
					]
				}),
				listing.deal === "sale" && (delta.extraSqft != null || delta.vsBuy != null) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-md bg-surface-2 px-3 py-2 text-sm text-muted",
					children: [
						"對卓濤軒",
						delta.extraSqft != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 tabular-nums text-fg",
							children: [
								delta.extraSqft >= 0 ? "+" : "",
								delta.extraSqft,
								"呎"
							]
						}) : null,
						delta.vsBuy != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("ml-2 tabular-nums", delta.vsBuy < 0 ? "text-primary" : "text-close"),
							children: formatDelta(delta.vsBuy, "sale")
						}) : null
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between gap-2 text-xs text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate",
						children: [
							listing.source,
							listing.agent ? ` · ${listing.agent}` : "",
							listing.posted ? ` · ${listing.posted}` : ""
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: listing.url,
								target: "_blank",
								rel: "noreferrer",
								children: ["開原文", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							asChild: true,
							"aria-label": "分享去 Telegram",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: telegramShareUrl(listing.url, shareText),
								target: "_blank",
								rel: "noreferrer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: saved ? "default" : "outline",
							size: "icon",
							"aria-label": saved ? "取消心水" : "加入心水",
							onClick: onToggleSave,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: saved ? "fill-current" : void 0 })
						})
					]
				})
			]
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadListings = createServerFn({ method: "POST" }).validator((d) => ({ force: Boolean(d?.force) })).handler(createSsrRpc("929d99346060014174612d544a0d0a34212a29a2a0c126d9dfba285ad0d1b8c1"));
var HUNT_SOURCES = [
	{
		id: "28-sale",
		name: "28Hse 梅窩售盤",
		blurb: "屋網即時搜尋 · Mui Wo",
		href: "https://www.28hse.com/buy?form_data=searchText%3DMui+Wo",
		kind: "sale"
	},
	{
		id: "28-rent",
		name: "28Hse 梅窩租盤",
		blurb: "屋網即時搜尋 · Mui Wo",
		href: "https://www.28hse.com/rent?form_data=searchText%3DMui+Wo",
		kind: "rent"
	},
	{
		id: "28-village",
		name: "28Hse 南大嶼山村屋",
		blurb: "離島村屋，入去再睇梅窩／橫塘／鹿地塘",
		href: "https://www.28hse.com/buy/apartment?buyRent=buy&cat_ids=4781&locations=%5B%2262%22%2C%22islands%22%5D",
		kind: "sale"
	},
	{
		id: "28-scenic",
		name: "28Hse 卓濤軒",
		blurb: "你而家屋苑嘅放盤同租盤",
		href: "https://www.28hse.com/buy?form_data=searchText%3D%E5%8D%93%E6%BF%A4%E8%BB%92",
		kind: "estate"
	},
	{
		id: "sp-sale",
		name: "千居 Spacious 售盤",
		blurb: "梅窩全區買樓",
		href: "https://www.spacious.hk/zh-tw/%E9%A6%99%E6%B8%AF/n/137-%E6%A2%85%E7%AA%A9/%E8%B2%B7%E6%A8%93",
		kind: "sale"
	},
	{
		id: "sp-rent",
		name: "千居 Spacious 租盤",
		blurb: "梅窩全區租屋",
		href: "https://www.spacious.hk/zh-tw/%E9%A6%99%E6%B8%AF/n/137-%E6%A2%85%E7%AA%A9/%E7%A7%9F%E5%B1%8B",
		kind: "rent"
	},
	{
		id: "hs-sale",
		name: "HomeSolutions 售盤",
		blurb: "南大嶼山專營代理 · 村屋最多",
		href: "https://homesolutions.hk/for-sale/",
		kind: "sale"
	},
	{
		id: "hs-rent",
		name: "HomeSolutions 租盤",
		blurb: "南大嶼山專營代理 · 村屋租盤",
		href: "https://homesolutions.hk/rent/",
		kind: "rent"
	},
	{
		id: "four-seasons",
		name: "四季物業 Tiffany",
		blurb: "梅窩舖頭代理 · 牌照 E-389063",
		href: "https://www.28hse.com/agent/1745",
		kind: "agent"
	},
	{
		id: "findley",
		name: "範梁集團",
		blurb: "銀運路海景大廈地下 · 梅窩本地盤",
		href: "https://www.28hse.com/agent/5907",
		kind: "agent"
	},
	{
		id: "midland",
		name: "美聯 卓濤軒成交",
		blurb: "2座 3樓 D 2026-06 成交 $348萬",
		href: "https://www.midland.com.hk/zh-hk/estate/%E6%96%B0%E7%95%8C-%E5%A4%A7%E5%B6%BC%E5%B1%B1%E5%8D%97-%E5%8D%93%E6%BF%A4%E8%BB%92-E00183",
		kind: "estate"
	},
	{
		id: "centanet",
		name: "中原 大嶼山",
		blurb: "中原分區樓盤",
		href: "https://hk.centanet.com/findproperty/list/buy?q=6OtYqumAmg",
		kind: "sale"
	}
];
var useAppState = create()(persist((set, get) => ({
	tab: "match",
	criteria: DEFAULT_CRITERIA,
	saved: [],
	setTab: (tab) => set({ tab }),
	setCriteria: (patch) => set({ criteria: {
		...get().criteria,
		...patch
	} }),
	toggleSaved: (id) => {
		const saved = get().saved;
		set({ saved: saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id] });
	}
}), {
	name: "muiwo-hunt",
	partialize: (s) => ({
		saved: s.saved,
		criteria: s.criteria
	}),
	skipHydration: true
}));
var TABS = [
	{
		id: "match",
		label: "筍盤"
	},
	{
		id: "sale",
		label: "售盤"
	},
	{
		id: "rent",
		label: "租盤"
	},
	{
		id: "saved",
		label: "心水"
	},
	{
		id: "sources",
		label: "盤源"
	}
];
function HomePage() {
	const { tab, setTab, criteria, setCriteria, saved, toggleSaved } = useAppState();
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		useAppState.persist.rehydrate();
	}, []);
	const listingsQuery = useQuery({
		queryKey: ["listings"],
		queryFn: () => loadListings({ data: { force: false } }),
		placeholderData: {
			listings: SEED_LISTINGS,
			fetchedAt: "",
			live: false,
			sources: []
		}
	});
	const refresh = useMutation({
		mutationFn: () => loadListings({ data: { force: true } }),
		onSuccess: (data) => {
			queryClient.setQueryData(["listings"], data);
			toast.success(data.live ? "已更新網上放盤" : "暫時用上次資料");
		},
		onError: () => toast.error("更新失敗，保留而家嘅盤")
	});
	const listings = listingsQuery.data?.listings ?? SEED_LISTINGS;
	const fetchedAt = listingsQuery.data?.fetchedAt;
	const live = listingsQuery.data?.live ?? false;
	const visible = (0, import_react.useMemo)(() => {
		let rows = listings.filter((l) => !isHos(l));
		if (tab === "sale") rows = rows.filter((l) => l.deal === "sale");
		if (tab === "rent") rows = rows.filter((l) => l.deal === "rent");
		if (tab === "saved") rows = rows.filter((l) => saved.includes(l.id));
		if (tab === "match") rows = rows.filter((l) => {
			const m = matchLevel(l, criteria);
			return m === "fit" || m === "close";
		});
		return [...rows].sort((a, b) => rank(a, criteria) - rank(b, criteria));
	}, [
		listings,
		tab,
		saved,
		criteria
	]);
	const fitCount = listings.filter((l) => matchLevel(l, criteria) === "fit").length;
	const digest = buildDigest(listings.filter((l) => matchLevel(l, criteria) === "fit"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "horizon min-h-dvh pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto max-w-5xl px-4 pb-4 pt-6 sm:pt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.22em] text-primary",
						children: "Silvermine Bay"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
							children: "梅窩換樓"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-muted sm:text-base",
							children: "只睇梅窩。村屋 700 呎；買盤低過 $400萬、大於 400 呎。居屋自動剔除。"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => refresh.mutate(),
								disabled: refresh.isPending,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: refresh.isPending ? "animate-spin" : void 0 }), "更新"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: telegramShareUrl("https://www.spacious.hk/zh-tw/%E9%A6%99%E6%B8%AF/n/137-%E6%A2%85%E7%AA%A9", digest),
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "Telegram"]
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnHome, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-2 text-xs text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: live ? "match" : "muted",
								children: live ? "網上即時" : "備用資料"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [fitCount, " 個合條件"] }),
							fetchedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["更新於 ", formatFetched(fetchedAt)] }) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-20 border-y border-border/70 bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 py-2",
					children: [TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(t.id),
						className: cn("h-10 shrink-0 rounded-md px-3.5 text-sm font-medium transition-colors", tab === t.id ? "bg-primary text-primary-fg" : "text-muted hover:bg-surface-2"),
						children: [t.label, t.id === "saved" && saved.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 tabular-nums",
							children: saved.length
						}) : null]
					}, t.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setFiltersOpen((v) => !v),
						className: "ml-auto flex h-10 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm text-muted hover:bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), "條件"]
					})]
				})
			}),
			filtersOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-5xl gap-4 px-4 py-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterField, {
						label: `買盤上限 ${formatPrice(criteria.maxSale, "sale")}`,
						value: criteria.maxSale,
						min: 2e6,
						max: 8e6,
						step: 1e5,
						onChange: (v) => setCriteria({ maxSale: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterField, {
						label: `私人樓最少 ${criteria.minAptSqft} 呎`,
						value: criteria.minAptSqft,
						min: 250,
						max: 800,
						step: 10,
						onChange: (v) => setCriteria({ minAptSqft: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterField, {
						label: `村屋最少 ${criteria.minVillageSqft} 呎`,
						value: criteria.minVillageSqft,
						min: 400,
						max: 1400,
						step: 50,
						onChange: (v) => setCriteria({ minVillageSqft: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterField, {
						label: `租金上限 $${criteria.maxRent.toLocaleString("en-HK")}`,
						value: criteria.maxRent,
						min: 8e3,
						max: 4e4,
						step: 500,
						onChange: (v) => setCriteria({ maxRent: v })
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-5xl px-4 py-6",
				children: tab === "sources" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourcesPanel, {
					onCopy: () => copyDigest(digest),
					digest
				}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { tab }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: visible.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, {
						listing,
						criteria,
						saved: saved.includes(listing.id),
						onToggleSave: () => toggleSaved(listing.id)
					}, listing.id))
				})
			})
		]
	});
}
function formatFetched(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	const hk = new Date(d.getTime() + 288e5);
	const pad = (n) => String(n).padStart(2, "0");
	return `${hk.getUTCMonth() + 1}/${hk.getUTCDate()} ${pad(hk.getUTCHours())}:${pad(hk.getUTCMinutes())}`;
}
function rank(listing, criteria) {
	const m = matchLevel(listing, criteria);
	const base = m === "fit" ? 0 : m === "close" ? 100 : 200;
	const price = listing.price ?? 9e12;
	return base + (listing.deal === "sale" ? price / 1e6 : price / 1e3);
}
function OwnHome() {
	const psf = ownUnitPrice();
	const comp = OWN_HOME.comps[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6 rounded-xl border border-border bg-raised/90 p-4 shadow-card sm:p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-11 items-center justify-center rounded-md bg-primary text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "而家住緊"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl font-medium",
						children: [
							OWN_HOME.name,
							OWN_HOME.block,
							OWN_HOME.floor,
							OWN_HOME.flat
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							OWN_HOME.boughtLabel,
							" · @",
							psf.toLocaleString("en-HK"),
							" · ",
							OWN_HOME.address
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: comp.url,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-2 inline-block text-sm text-primary underline-offset-4 hover:underline",
						children: [
							"同座 3樓 D 成交 ",
							formatPrice(comp.price, "sale"),
							"／",
							formatSqft(comp.sqft),
							"（",
							comp.date,
							"）"
						]
					})
				]
			})]
		})
	});
}
function FilterField({ label, value, min, max, step, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block rounded-lg border border-border bg-raised p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "mt-2 w-full accent-primary"
		})]
	});
}
function SourcesPanel({ onCopy, digest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: onCopy,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "複製合條件摘要"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: telegramShareUrl("https://www.28hse.com/buy?form_data=searchText%3DMui+Wo", digest),
					target: "_blank",
					rel: "noreferrer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "傳去 Telegram"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: HUNT_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: s.href,
				target: "_blank",
				rel: "noreferrer",
				className: "flex h-full flex-col rounded-xl border border-border bg-raised p-4 shadow-card transition-colors hover:border-border-strong",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-wider text-subtle",
						children: s.kind === "agent" ? "代理" : s.kind === "estate" ? "屋苑" : s.kind === "rent" ? "租" : "售"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 font-display text-lg",
						children: s.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 text-sm text-muted",
						children: s.blurb
					})
				]
			}) }, s.id))
		})]
	});
}
function EmptyState({ tab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-dashed border-border-strong bg-raised px-6 py-16 text-center",
		children: tab === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mx-auto size-6 text-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-xl",
				children: "未有心水"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "喺盤上面撳書籤，之後可以一齊傳去 Telegram。"
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "mx-auto size-6 text-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-xl",
				children: "呢頁暫時無盤"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "試下放寬條件，或者去「盤源」開代理網站。"
			})
		] })
	});
}
function buildDigest(listings) {
	const sales = listings.filter((l) => l.deal === "sale");
	const rents = listings.filter((l) => l.deal === "rent");
	const line = (l) => `• ${l.estate || l.title} ${l.sqft ? formatSqft(l.sqft) : ""} ${l.price ? formatPrice(l.price, l.deal) : ""} ${l.url}`;
	return [
		"梅窩合條件盤（唔要居屋）",
		sales.length ? "【售】" : "",
		...sales.map(line),
		rents.length ? "【租】" : "",
		...rents.map(line)
	].filter(Boolean).join("\n");
}
async function copyDigest(digest) {
	try {
		await navigator.clipboard.writeText(digest);
		toast.success("已複製，可以貼去 Telegram");
	} catch {
		toast.error("複製失敗");
	}
}
//#endregion
export { HomePage as component };
