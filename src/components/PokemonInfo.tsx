import styled from 'styled-components';

import { useEffect, useState } from 'react';

import { PokemonCallItem, PokemonDataType } from '../types';

const PokemonInfoDiv = styled.div`
  width: 80%;
  padding: 10px;
  background-color: #ff8400;
  margin: 2.5rem auto;
  border-radius: 10px;
`;

const PokemonSprite = styled.img`
  border: 5px solid black;
  border-radius: 3px;
  width: 150px;
  display: block;
  margin: auto;
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
      <PokemonSprite src={pokemonData?.sprites.front_default} alt='' />
    </PokemonInfoDiv>
  );
}
