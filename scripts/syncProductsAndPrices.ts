import "dotenv/config";
import { stripe } from "@/lib/stripe";
import { db } from "@/src/drizzle/db";
import { product, price } from "@/src/drizzle/schema";

/**
 * Syncs products and prices from Stripe to the local database using Prisma.
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
      // Upsert the product
      // await tx.product.upsert({
      //   where: { product_id: product.id },
      //   update: {
      //     name: product.name,
      //     description: product.description ?? null,
      //     active: product.active,
      //   },
      //   create: {
      //     product_id: product.id,
      //     name: product.name,
      //     description: product.description ?? null,
      //     active: product.active,
      //   },
      // });

      await tx
        .insert(product)
        .values({
          productId: productStripe.id,
          name: productStripe.name,
          description: productStripe.description ?? null,
          active: productStripe.active,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          target: product.productId,
          set: {
            name: productStripe.name,
            description: productStripe.description ?? null,
            active: productStripe.active,
          },
        });

      for (const priceStripe of prices.data) {
        // await tx.price.upsert({
        //   where: { price_id: price.id },
        //   update: {
        //     currency: price.currency,
        //     unit_amount: BigInt(price.unit_amount ?? 0),
        //     recurring_interval: (price.recurring?.interval as Interval) ?? null,
        //     recurring_interval_count: price.recurring?.interval_count ?? 1,
        //     recurring_usage_type:
        //       (price.recurring?.usage_type as UsageType) ?? "licensed",
        //     active: price.active,
        //   },
        //   create: {
        //     price_id: price.id,
        //     product_id: productStripe.id,
        //     currency: price.currency,
        //     unit_amount: BigInt(price.unit_amount ?? 0),
        //     recurring_interval: (price.recurring?.interval as Interval) ?? null,
        //     recurring_interval_count: price.recurring?.interval_count ?? 1,
        //     recurring_usage_type:
        //       (price.recurring?.usage_type as UsageType) ?? "licensed",
        //     active: price.active,
        //   },
        // });
        await tx
          .insert(price)
          .values({
            priceId: priceStripe.id,
            productId: productStripe.id,
            currency: priceStripe.currency,
            unitAmount: priceStripe.unit_amount ?? 0,
            recurringInterval: priceStripe.recurring?.interval,
            recurringIntervalCount: priceStripe.recurring?.interval_count ?? 1,
            recurringUsageType: priceStripe.recurring?.usage_type ?? "licensed",
            active: priceStripe.active,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          })
          .onConflictDoUpdate({
            target: price.priceId,
            set: {
              currency: priceStripe.currency,
              unitAmount: priceStripe.unit_amount ?? 0,
              recurringInterval: priceStripe.recurring?.interval ?? undefined,
              recurringIntervalCount:
                priceStripe.recurring?.interval_count ?? 1,
              recurringUsageType:
                priceStripe.recurring?.usage_type ?? "licensed",
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
