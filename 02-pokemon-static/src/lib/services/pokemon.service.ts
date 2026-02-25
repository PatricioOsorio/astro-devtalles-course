import type { IPokemonListResponse } from '../../interfaces/pokemon-list.response';
import type { IPokemonResponse } from '../../interfaces/pokemon.response';
import { apiClient, mapAxiosError } from '../http/apiClient';

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

export async function getPokemonByUrl(url: string): Promise<IPokemonResponse> {
  try {
    // Axios soporta URL absoluta aunque haya baseURL.
    const { data } = await apiClient.get<IPokemonResponse>(url);
    return data;
  } catch (error) {
    throw mapAxiosError(error);
  }
}