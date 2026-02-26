export const queryKeys = {
  pokemonList: (limit = 20, offset = 0) => ['pokemon-list', { limit, offset }] as const,
  pokemonDetail: (name: string) => ['pokemon-detail', { name }] as const,
};
