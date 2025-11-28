import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface DailyCard {
  id: string;
  date: string;
  title: string;
  message: string;
  mantra?: string;
  tone: string;
  prompts?: Record<string, unknown>;
  createdAt?: string;
}

export interface PracticeTrack {
  id: string;
  date: string;
  practiceCompleted: boolean;
  streakCount: number;
}

const today = () => new Date().toISOString().slice(0, 10);

export function useDailyCard(date?: string) {
  const queryClient = useQueryClient();
  const targetDate = date ?? today();

  const dailyQuery = useQuery<DailyCard>({
    queryKey: ['daily', targetDate],
    queryFn: () => apiFetch(`/daily/${targetDate}`),
  });

  const completeMutation = useMutation({
    mutationFn: (payloadDate?: string) =>
      apiFetch<PracticeTrack>('/practice/complete', {
        method: 'POST',
        body: JSON.stringify({ date: payloadDate ?? targetDate }),
      }),
    onSuccess: async (_track: PracticeTrack, variables: string | undefined) => {
      await queryClient.invalidateQueries({ queryKey: ['daily', variables ?? targetDate] });
    },
  });

  return {
    card: dailyQuery.data,
    isLoading: dailyQuery.isLoading,
    refresh: dailyQuery.refetch,
    completePractice: completeMutation.mutateAsync,
    completing: completeMutation.isPending,
    streak: completeMutation.data?.streakCount,
  };
}
