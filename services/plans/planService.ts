/**
 * Fetch all active Prices (recommended replacement for deprecated /v1/plans)
 */
const fetchPlans = async () => {
  const res = await fetch("/api/stripe/plans");
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
};

export const planServices = {
  fetchPlans,
};
