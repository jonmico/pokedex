import PokemonListItem from './PokemonListItem';

import { PokemonCallItem } from '../types';

interface PokemonListProps {
  pokemonList: PokemonCallItem[] | null;
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <ul>
      {pokemonList &&
        pokemonList.map((pokemon) => (
          <PokemonListItem key={pokemon.name} pokemonItem={pokemon} />
        ))}
    </ul>
  );
}
