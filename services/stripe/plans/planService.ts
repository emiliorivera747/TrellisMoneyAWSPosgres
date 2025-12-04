/**
 * Retrieve all of the current plans from stripe
 *
 */
const fetchPlans = async () => {
  const url = "https://api.stripe.com/v1/plans";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
  });

  if (!res.ok) throw new Error(`There was an error fetching plans from Stripe`);

  const plansResponse = await res.json();

  return plansResponse;
};

export const planServices = {
  fetchPlans,
};
