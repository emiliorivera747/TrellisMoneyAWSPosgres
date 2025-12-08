import { stripe } from "@/lib/stripe";

type PlanMap = Record<string, string>; // slug → price_id

let cachedPlans: PlanMap = {};
let LASTFETCHED = 0;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

/**
 * Retrieves the Stripe price ID associated with a given slug.
 *
 * This function checks if the cached plans are stale or empty. If so, it refreshes
 * the cache by fetching the active prices from Stripe and mapping their `url_slug`
 * metadata to their respective price IDs. The cache is then used to quickly retrieve
 * the price ID for the given slug.
 *
 * @param slug - The unique identifier (slug) used to look up the corresponding price ID.
 * @returns A promise that resolves to the price ID as a string if the slug exists in the cache,
 *          or `null` if the slug is not found.
 *
 * @remarks
 * - The cache is refreshed if it is empty or if the time since the last fetch exceeds
 *   the defined cache time-to-live (CACHE_TTL_MS).
 * - The `url_slug` metadata field in Stripe prices is used to map slugs to price IDs.
 * - Ensure that the Stripe API key is properly configured for the `stripe` instance.
 *
 * @example
 * ```typescript
 * const priceId = await getPriceIdBySlug("premium-plan");
 * if (priceId) {
 *   console.log(`Price ID for premium plan: ${priceId}`);
 * } else {
 *   console.log("Slug not found in cached plans.");
 * }
 * ```
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
