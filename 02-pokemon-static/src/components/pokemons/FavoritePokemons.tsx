import type { IFavoritePokemon } from '@interfaces/favorite-pokemon';
import { LOCAL_STORAGE_KEY } from '@utils/constants';
import { createSignal, For, type Component } from 'solid-js';

const getLocalStoragePokemons = (): IFavoritePokemon[] => {
  const favoritePokemons = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY.FAVORITE_POKEMONS) ?? '[]'
  );

  return favoritePokemons;
};

export const FavoritePokemons = () => {
  const [pokemons, setPokemons] = createSignal(getLocalStoragePokemons());

  return (
    <section class="grid grid-cols-2 sm:grid-cols-4">
      <For each={pokemons()}>{(pokemon) => <div>{pokemon.name}</div>}</For>
    </section>
  );
};
