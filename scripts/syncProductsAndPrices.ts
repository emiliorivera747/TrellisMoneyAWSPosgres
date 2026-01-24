import "dotenv/config";
import { stripe } from "@/lib/stripe";
import { db } from "@/drizzle/db";
import { product, price, PriceInsert } from "@/drizzle/schema";

/**
 * Syncs products and prices from Stripe to the local database using Drizzle.
 *
 * Fetches active products and their prices from Stripe, then upserts them into the database
 * within a transaction to ensure consistency.
 *
 * @async
 * @function
 * @throws {Error} On Stripe API or database operation failure.
 *
 * @example
 * await syncProductsAndPrices();
 */
async function syncProductsAndPrices() {
  const products = await stripe.products.list({ active: true });

  for (const productStripe of products.data) {
    const prices = await stripe.prices.list({ product: productStripe.id });

    // Wrap the product + prices upserts in a transaction
    await db.transaction(async (tx) => {
      await tx
        .insert(product)
        .values({
          productId: productStripe.id,
          productName: productStripe.name,
          description: productStripe.description ?? null,
          active: productStripe.active,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          target: product.productId,
          set: {
            productName: productStripe.name,
            description: productStripe.description ?? null,
            active: productStripe.active,
          },
        });

      for (const priceStripe of prices.data) {
        await tx
          .insert(price)
          .values({
            priceId: priceStripe.id,
            productId: productStripe.id,
            currency: priceStripe.currency,
            unitAmount: priceStripe.unit_amount ?? 0,
            recurringInterval: (priceStripe.recurring?.interval)?.toUpperCase(),
            recurringIntervalCount: priceStripe.recurring?.interval_count ?? 1,
            recurringUsageType:
              priceStripe.recurring?.usage_type?.toUpperCase() ?? "LICENSED",
            active: priceStripe.active,
          } as PriceInsert)
          .onConflictDoUpdate({
            target: price.priceId,
            set: {
              currency: priceStripe.currency,
              unitAmount: priceStripe.unit_amount ?? 0,
              recurringInterval: (priceStripe.recurring?.interval?.toUpperCase() as "DAY" | "WEEK" | "MONTH" | "YEAR") ?? "MONTH",
              recurringIntervalCount:
                priceStripe.recurring?.interval_count ?? 1,
              recurringUsageType:
                (priceStripe.recurring?.usage_type?.toUpperCase() as
                  | "METERED"
                  | "LICENSED"
                  | undefined) || "LICENSED",
              active: priceStripe.active,
            },
          });
      }
    });
    console.log(
      `Synced product ${productStripe.id} with ${prices.data.length} price(s)`
    );
  }
  console.log("All products and prices synced successfully!");
}

// Execute the sync
syncProductsAndPrices()
  .catch((err) => {
    console.error("Error during sync:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
