import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export function usePlate(id) {
  return useQuery({
    queryKey: ['plate', id],
    queryFn: async () => {
      const response = await api.get(`/plates/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}
