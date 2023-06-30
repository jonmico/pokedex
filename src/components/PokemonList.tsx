import { PokemonCallItem } from '../types';

interface PokemonListProps {
  pokemonList: PokemonCallItem[] | null;
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <ul>
      {pokemonList && pokemonList.map((pokemon) => <li>{pokemon.name}</li>)}
    </ul>
  );
}
