import type { IFavoritePokemon } from '@interfaces/favorite-pokemon';
import { LOCAL_STORAGE_KEY } from '@utils/constants';
import { createSignal, For, type Component } from 'solid-js';
import { FavoritePokemon } from './FavoritePokemon';

export const getLocalStoragePokemons = (): IFavoritePokemon[] => {
  const favoritePokemons = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY.FAVORITE_POKEMONS) ?? '[]'
  );

  return favoritePokemons;
};

export const setLocalStoragePokemon = (pokemons: IFavoritePokemon[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.FAVORITE_POKEMONS, JSON.stringify(pokemons));
};

export const FavoritePokemons = () => {
  const [pokemons] = createSignal(getLocalStoragePokemons());

  return (
    <section class="grid grid-cols-2 sm:grid-cols-4">
      <For each={pokemons()}>{(pokemon) => <FavoritePokemon pokemon={pokemon} />}</For>
    </section>
  );
};
