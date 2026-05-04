import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await api.get('/profile');
            return response.data;
        },
        staleTime: 1000 * 60 * 2,
        retry: 1,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates) => {
            const response = await api.put('/profile', updates);
            return response.data;
        },
        onMutate: async (updates) => {
            await queryClient.cancelQueries({ queryKey: ['profile'] });

            const previousProfile = queryClient.getQueryData(['profile']);

            queryClient.setQueryData(['profile'], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    dietary_tags: updates.dietary_tags,
                };
            });

            return { previousProfile };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousProfile) {
                queryClient.setQueryData(['profile'], context.previousProfile);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
}
