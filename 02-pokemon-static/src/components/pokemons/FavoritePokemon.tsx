import { createSignal, Show, type Component } from 'solid-js';

import type { IFavoritePokemon } from '@interfaces/favorite-pokemon';
import { getLocalStoragePokemons, setLocalStoragePokemon } from './FavoritePokemons';

export interface IFavoritePokemonProps {
  pokemon: IFavoritePokemon;
}
export const FavoritePokemon: Component<IFavoritePokemonProps> = ({ pokemon }) => {
  const [isVisible, setIsVisible] = createSignal(true);

  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const handleDelete = () => {
    const favorites = getLocalStoragePokemons();

    const newFavorites = favorites.filter((p) => p.id !== pokemon.id);

    setLocalStoragePokemon(newFavorites);
    setIsVisible(false);
  };

  return (
    <Show when={isVisible()}>
      <section class="group w-44 rounded-xl border border-slate-900 bg-slate-800 p-3 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ">
        <a
          href={`/pokemons/${pokemon.name}`}
          class="flex flex-col items-center gap-2 no-underline"
          aria-label={`Ver detalle de ${pokemon.name}`}
        >
          <img
            src={imageSrc}
            alt={pokemon.name}
            loading="lazy"
            width="112"
            height="112"
            class="h-28 w-28 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <p class="text-sm font-semibold capitalize">
            #{pokemon.id} - {pokemon.name}
          </p>
        </a>

        <button
          type="button"
          class="btn btn--outline btn--outline-danger mt-3 w-full"
          onClick={handleDelete}
          aria-label={`Eliminar a ${pokemon.name} de favoritos`}
        >
          Eliminar
        </button>
      </section>
    </Show>
  );
};
