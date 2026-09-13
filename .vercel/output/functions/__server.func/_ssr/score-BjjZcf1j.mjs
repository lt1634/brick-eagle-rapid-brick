//#region node_modules/.nitro/vite/services/ssr/assets/score-BjjZcf1j.js
var OWN_HOME = {
	name: "卓濤軒",
	block: "2座",
	floor: "1樓",
	flat: "D室",
	address: "梅窩碼頭路18A號",
	buyPrice: 415e4,
	sqft: 350,
	extra: "連平台",
	boughtLabel: "購入 $415萬 · 350呎連平台",
	comps: [{
		label: "2座 3樓 D室",
		date: "2026-06-23",
		price: 348e4,
		sqft: 354,
		note: "註冊處成交，同座同室向、連平台",
		url: "https://www.midland.com.hk/zh-hk/estate/%E6%96%B0%E7%95%8C-%E5%A4%A7%E5%B6%BC%E5%B1%B1%E5%8D%97-%E5%8D%93%E6%BF%A4%E8%BB%92-E00183"
	}]
};
var DEFAULT_CRITERIA = {
	maxSale: 4e6,
	minAptSqft: 401,
	minVillageSqft: 700,
	maxRent: 2e4,
	excludeHos: true,
	muiWoOnly: true
};
var MUI_WO_YES = /梅窩|mui\s*wo|卓濤軒|scenic\s*crest|海灣樓|harbour\s*view|海愉花園|sea\s*crest|梅窩中心|福安閣|家樂閣|lucky\s*court|銀濤軒|華林|銀河灣畔|riverwalk|橫塘|wang\s*tong|鹿地塘|luk\s*tei|白銀鄉|pak\s*ngan|大地塘|tai\s*tei|麻布|稔埔|涌口|chung\s*hau|銀礦|silvermine|銀輝|銀寶|銀礦中心|美軒閣|nagan\s*wan|ngan\s*wan|scenic|muiwo/i;
var MUI_WO_NO = /貝澳|pui\s*o|長沙|cheung\s*sha|塘福|tong\s*fuk|大澳|tai\s*o|水口|shui\s*hau|南涌|nam\s*chung|芝麻灣|ham\s*tin|cheung\s*chau|tung\s*chung|sea\s*ranch|坪洲|peng\s*chau|shap\s*long|石壁|shek\s*pik|長洲|南丫|lamma|discovery\s*bay|愉景灣|東涌/i;
var HOS_RE = /銀河苑|ngan\s*ho|居屋|["“”]?hos["“”]?|home\s*ownership/i;
function blobOf(listing) {
	return [
		listing.title,
		listing.estate,
		listing.unit,
		listing.areaLabel,
		listing.tags.join(" "),
		listing.url
	].join(" ");
}
function isHos(listing) {
	return HOS_RE.test(blobOf(listing));
}
function isMuiWo(listing) {
	const text = blobOf(listing);
	if (MUI_WO_NO.test(text) && !/梅窩|mui\s*wo|卓濤軒/i.test(text)) return false;
	if (MUI_WO_NO.test(text) && !MUI_WO_YES.test(text)) return false;
	return MUI_WO_YES.test(text);
}
function unitPrice(listing) {
	if (!listing.price || !listing.sqft) return null;
	return Math.round(listing.price / listing.sqft);
}
function matchLevel(listing, criteria = DEFAULT_CRITERIA) {
	if (criteria.muiWoOnly && !isMuiWo(listing)) return "out";
	if (criteria.excludeHos && isHos(listing)) return "out";
	if (listing.deal === "sale") {
		if (listing.price == null || listing.price >= criteria.maxSale) {
			if (listing.price != null && listing.price <= criteria.maxSale * 1.15 && sizeOk(listing, criteria)) return "close";
			return "out";
		}
		if (!sizeOk(listing, criteria)) {
			if (listing.kind === "village" && (listing.sqft ?? 0) >= 600) return "close";
			if (listing.kind !== "village" && (listing.sqft ?? 0) >= 350) return "close";
			return "out";
		}
		return "fit";
	}
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
function sizeOk(listing, criteria) {
	const sqft = listing.sqft ?? 0;
	if (listing.kind === "village") return sqft >= criteria.minVillageSqft;
	return sqft > criteria.minAptSqft - 1 && sqft >= criteria.minAptSqft;
}
function swapDelta(listing) {
	return {
		extraSqft: listing.sqft != null ? listing.sqft - OWN_HOME.sqft : null,
		vsBuy: listing.deal === "sale" && listing.price != null ? listing.price - OWN_HOME.buyPrice : null,
		vsComp: listing.deal === "sale" && listing.price != null ? listing.price - OWN_HOME.comps[0].price : null
	};
}
function ownUnitPrice() {
	return Math.round(OWN_HOME.buyPrice / OWN_HOME.sqft);
}
//#endregion
export { matchLevel as a, unitPrice as c, isMuiWo as i, OWN_HOME as n, ownUnitPrice as o, isHos as r, swapDelta as s, DEFAULT_CRITERIA as t };
