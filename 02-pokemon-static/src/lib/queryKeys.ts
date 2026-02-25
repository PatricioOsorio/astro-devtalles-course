export const queryKeys = {
  pokemonList: (limit = 10, offset = 0) => ['pokemon-list', { limit, offset }] as const,
  pokemonDetail: (name: string) => ['pokemon-detail', { name }] as const,
};
