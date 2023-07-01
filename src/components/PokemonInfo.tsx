import styled from 'styled-components';

import { useEffect, useState } from 'react';

import { PokemonCallItem, PokemonDataType } from '../types';
import PokemonHeader from './PokemonHeader';

const PokemonInfoDiv = styled.div`
  border: 1px solid black;
  width: 80%;
  padding: 10px;
  background-color: #ff8400;
  margin: 3rem auto;
  border-radius: 10px;
`;

const PokemonSprite = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  background-color: #bacddb;
  width: 90%;
  margin: 1.5rem auto;
  img {
    width: 300px;
    display: block;
    margin: auto;
  }
`;

interface PokemonInfoProps {
  pokemon: PokemonCallItem | null;
}

export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  const [pokemonData, setPokemonData] = useState<PokemonDataType | null>(null);
  useEffect(() => {
    async function getPokemonInfo() {
      if (pokemon) {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        setPokemonData(data);
      }
    }
    getPokemonInfo();
  }, [pokemon]);

  return (
    <PokemonInfoDiv>
      <PokemonSprite>
        <img src={pokemonData?.sprites.front_default} alt='' />
      </PokemonSprite>
      <PokemonHeader pokemon={pokemonData} />
    </PokemonInfoDiv>
  );
}
