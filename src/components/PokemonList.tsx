import { useEffect } from 'react';

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

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 10px 10px;
  margin: auto;
  font-family: Silkscreen;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: #ff8400;

  &:hover {
    opacity: 0.8;
    font-weight: bold;
    cursor: pointer;
  }
  &:active {
    background-color: #cc322a;
  }
  img {
    width: 50px;
  }
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
      <LoadMoreButton>
        Load More{' '}
        <img
          src={
            'https://www.pngmart.com/files/2/Pikachu-Transparent-Background.png'
          }
        ></img>
      </LoadMoreButton>
    </List>
  );
}
