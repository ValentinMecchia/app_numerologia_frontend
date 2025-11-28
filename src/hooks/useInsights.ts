import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface Insight {
  id: string;
  mantra: string;
  numerology: Record<string, unknown>;
  astrology: Record<string, unknown>;
  daily: Record<string, unknown>;
  createdAt: string;
}

interface InsightsResponse {
  data: Insight[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export function useInsights(page = 1, limit = 6) {
  const query = useQuery<InsightsResponse>({
    queryKey: ['insights', page, limit],
    queryFn: () => apiFetch(`/insights?page=${page}&limit=${limit}`),
    keepPreviousData: true,
  });

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
