import type { IPokemonListResponse } from '@interfaces/pokemon-list.response';
import type { IPokemonResponse } from '@interfaces/pokemon.response';
import { apiClient, mapAxiosError } from '@lib/http/apiClient';

export async function getPokemonList(limit = 20, offset = 0): Promise<IPokemonListResponse> {
  try {
    const { data } = await apiClient.get<IPokemonListResponse>('/pokemon', {
      params: { limit, offset },
    });
    return data;
  } catch (error) {
    throw mapAxiosError(error);
  }
}

export async function getPokemonById(id: string): Promise<IPokemonResponse> {
  try {
    const { data } = await apiClient.get<IPokemonResponse>(`/pokemon/${id}`);
    return data;
  } catch (error) {
    throw mapAxiosError(error);
  }
}
