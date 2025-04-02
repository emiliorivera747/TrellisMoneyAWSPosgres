import {useQuery} from '@tanstack/react-query';
import {networthService} from '@/features/net-worth/services/networthService';

const useFetchNetWorth = () => {
    const {data: netWorthData, error: netWorthError, isLoading: netWorthLoading} = useQuery({
        queryKey: ['netWorth'],
        queryFn: networthService.getNetWorth,
    });
    
    return {netWorthData, netWorthError, netWorthLoading};
};

export default useFetchNetWorth;