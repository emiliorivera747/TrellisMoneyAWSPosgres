import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Interval, UsageType } from "@prisma/client";

/**
 * Synchronizes products and their associated prices from Stripe to a local database using Prisma.
 * 
 * This function retrieves all active products from Stripe, along with their associated prices,
 * and ensures that the local database is up-to-date by performing upserts (update or insert) 
 * for each product and its prices. The upserts are wrapped in a transaction to ensure data consistency.
 * 
 * @async
 * @function
 * 
 * @remarks
 * - The function uses Stripe's API to fetch products and prices.
 * - It uses Prisma's `$transaction` method to perform database operations atomically.
 * - Products and prices are upserted based on their unique identifiers (`product_id` and `price_id`).
 * - The function assumes that the `product` and `price` tables exist in the Prisma schema.
 * 
 * @throws {Error} If there is an issue with the Stripe API or the database operations.
 * 
 * @example
 * // Call the function to sync products and prices
 * await syncProductsAndPrices();
 * 
 * @see {@link https://stripe.com/docs/api/products/list} for Stripe's product listing API.
 * @see {@link https://stripe.com/docs/api/prices/list} for Stripe's price listing API.
 */
async function syncProductsAndPrices() {
  const products = await stripe.products.list({ active: true });

  for (const product of products.data) {
    const prices = await stripe.prices.list({ product: product.id });

    // Wrap the product + prices upserts in a transaction
    await prisma.$transaction(async (tx) => {
      // Upsert the product
      await tx.product.upsert({
        where: { product_id: product.id },
        update: {
          name: product.name,
          description: product.description ?? null,
          active: product.active,
        },
        create: {
          product_id: product.id,
          name: product.name,
          description: product.description ?? null,
          active: product.active,
        },
      });

      // Upsert all prices for this product
      for (const price of prices.data) {
        await tx.price.upsert({
          where: { price_id: price.id },
          update: {
            currency: price.currency,
            unit_amount: BigInt(price.unit_amount ?? 0),
            recurring_interval: (price.recurring?.interval as Interval) ?? null,
            recurring_interval_count: price.recurring?.interval_count ?? 1,
            recurring_usage_type:
              (price.recurring?.usage_type as UsageType) ?? "licensed",
            active: price.active,
          },
          create: {
            price_id: price.id,
            product_id: product.id,
            currency: price.currency,
            unit_amount: BigInt(price.unit_amount ?? 0),
            recurring_interval: (price.recurring?.interval as Interval) ?? null,
            recurring_interval_count: price.recurring?.interval_count ?? 1,
            recurring_usage_type:
              (price.recurring?.usage_type as UsageType) ?? "licensed",
            active: price.active,
          },
        });
      }
    });

    console.log(
      `Synced product ${product.id} with ${prices.data.length} price(s)`
    );
  }

  console.log("All products and prices synced successfully!");
}

// Execute the sync
syncProductsAndPrices()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("Error syncing products and prices:", err);
    prisma.$disconnect();
  });
