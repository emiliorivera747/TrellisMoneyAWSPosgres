import { useQuery } from "@tanstack/react-query";
import { planServices } from "@/services/plans/planService";

export const usePlans = () => {
  const {
    data: plansResponse,
    error: plansError,
    isPending: isPendingPlans,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: () => planServices.fetchPlans(),
  });
  return { plansResponse, plansError, isPendingPlans };
};
