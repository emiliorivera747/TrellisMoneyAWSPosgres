import { stripe } from "@/lib/stripe";

type PlanMap = Record<string, string>; // slug → price_id

let cachedPlans: PlanMap = {};
let LASTFETCHED = 0;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

/**
 * Fetches the Stripe price ID for a given slug, using a cached mapping.
 * Refreshes the cache if empty or stale (older than CACHE_TTL_MS).
 *
 * @param slug - The slug to look up.
 * @returns A promise resolving to the price ID or `null` if not found.
 *
 * @example
 * const priceId = await getPriceIdBySlug("premium-plan");
 * console.log(priceId ?? "Slug not found.");
 */
export async function getPriceIdBySlug(slug: string): Promise<string | null> {
  const NOW = Date.now();

  /**
   * If cached plans does not exist or it has been longer than 30 minutes since the last time it was updated
   */
  if (
    Object.keys(cachedPlans).length === 0 ||
    NOW - LASTFETCHED > CACHE_TTL_MS
  ) {
    const { data } = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ["data.product"],
    });

    cachedPlans = {};
    for (const price of data) {
      const planSlug =
        typeof price.product === "object" &&
        price.product !== null &&
        "metadata" in price.product
          ? price.product.metadata?.url_slug
          : undefined;

      if (planSlug) cachedPlans[planSlug] = price.id;
    }
    LASTFETCHED = NOW;
  }

  return cachedPlans[slug] ?? null;
}
