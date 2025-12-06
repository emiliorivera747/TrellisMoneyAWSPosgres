import { StripeProduct } from "@/features/stripe/types/price";

/**
 * Extracts the marketing feature names from a given Stripe product.
 *
 * @param product - The Stripe product object containing marketing features.
 * @returns An array of feature names, or `undefined` if no features are present.
 */
const getFeaturesFromProducts = (product: StripeProduct) => {
  const features = product?.marketing_features?.map((feature) => feature.name);
  return features;
};

export default getFeaturesFromProducts;
