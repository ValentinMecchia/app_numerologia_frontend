import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface ProfileResponse {
  user: {
    id: string;
    email: string;
    nombre?: string;
    apellido?: string;
    fechaNac?: string;
    horaNac?: string;
    lugarNac?: { city: string; country?: string };
  };
  profile: {
    fraseFavorita?: string;
    estadoAnimo?: { tag: string; note?: string };
    metaActual?: string;
    theme?: 'light' | 'dark';
  };
}

export interface UpdateProfilePayload {
  nombre?: string;
  apellido?: string;
  fecha_nac?: string;
  hora_nac?: string;
  lugar_nac?: { city: string; country?: string };
  frase_favorita?: string;
  estado_animo?: { tag: string; note?: string };
  meta_actual?: string;
  theme?: 'light' | 'dark';
}

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: () => apiFetch('/profile/me'),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      apiFetch('/profile/me', {
        method: 'PUT',
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return {
    data: profileQuery.data,
    isLoading: profileQuery.isLoading,
    refresh: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    updateProfile: updateMutation.mutateAsync,
    updating: updateMutation.isPending,
  };
}
