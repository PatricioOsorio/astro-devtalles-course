import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

export function mapAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.statusText || error.message;
    return new Error(status ? `HTTP ${status}: ${message}` : message);
  }
  return error instanceof Error ? error : new Error('Unknown request error');
}
