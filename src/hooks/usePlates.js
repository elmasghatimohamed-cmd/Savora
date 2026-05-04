import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export function usePlates(params = {}) {
    return useQuery({
        queryKey: ['plates', params],
        queryFn: async () => {
            const response = await api.get('/plates', { params });
            return response.data;
        },
        staleTime: 1000 * 60 * 2,
        retry: 1,
    });
}
