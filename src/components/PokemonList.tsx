import styled from 'styled-components';

import PokemonListItem from './PokemonListItem';

import { PokemonCallItem } from '../types';

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 70%;
  margin: auto;
  font-family: Silkscreen;
  height: 70%;
  border: 1px solid black;
  overflow: auto;
`;

interface PokemonListProps {
  pokemonList: PokemonCallItem[] | null;
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <List>
      {pokemonList &&
        pokemonList.map((pokemon) => (
          <PokemonListItem key={pokemon.name} pokemonItem={pokemon} />
        ))}
    </List>
  );
}
