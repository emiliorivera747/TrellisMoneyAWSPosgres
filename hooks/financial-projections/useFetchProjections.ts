import { useQuery } from "@tanstack/react-query";
const currentYear = Number(new Date().getFullYear().toString());
import { fetchProjections } from "@/features/projected-net-worth/utils/fetchProjectionData";


interface useFetchProjectionsProps {
  selectedYear: number;
  selectedFilter: string;
}

const useFetchProjections = ({
  selectedYear,
  selectedFilter,
}: useFetchProjectionsProps) => {
  const {
    data: projectionData,
    error: projectionError,
    isLoading: projectionLoading,
  } = useQuery({
    queryKey: [
      "projectedAssetsAndNetworth",
      currentYear,
      selectedYear,
      selectedFilter,
    ],
    queryFn: () =>
      fetchProjections(
        Number(currentYear),
        Number(selectedYear),
        selectedFilter
      ),
    enabled: !!selectedYear,
  });
  return { projectionData, projectionError, projectionLoading };
};

export default useFetchProjections;
