import {useQuery} from '@tanstack/react-query';
import {networthService} from '@/features/net-worth/services/networthService';

/**
 * Custom hook to fetch net worth data.
 * Utilizes React Query for data fetching and caching.
 *
 * @returns {object} - Contains net worth data, error, and loading state.
 */
export const useFetchNetWorth = () => {
    const {data: netWorthData, error: netWorthError, isLoading: netWorthLoading} = useQuery({
        queryKey: ['netWorth'],
        queryFn: networthService.getNetWorth,
    });
    
    return {netWorthData, netWorthError, netWorthLoading};
};
