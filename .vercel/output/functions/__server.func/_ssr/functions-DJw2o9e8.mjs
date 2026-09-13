import { t as SEED_LISTINGS } from "./seed-BQmXIfqQ.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/functions-DJw2o9e8.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadListings_createServerFn_handler = createServerRpc({
	id: "929d99346060014174612d544a0d0a34212a29a2a0c126d9dfba285ad0d1b8c1",
	name: "loadListings",
	filename: "src/lib/listings/functions.ts"
}, (opts) => loadListings.__executeServer(opts));
var loadListings = createServerFn({ method: "POST" }).validator((d) => ({ force: Boolean(d?.force) })).handler(loadListings_createServerFn_handler, async ({ data }) => {
	try {
		const { collectListings } = await import("./fetch.server-DWAvHXF_.mjs");
		return await collectListings(Boolean(data.force));
	} catch {
		return {
			listings: SEED_LISTINGS,
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
			live: false,
			sources: [{
				source: "seed",
				ok: true,
				count: SEED_LISTINGS.length
			}]
		};
	}
});
//#endregion
export { loadListings_createServerFn_handler };
