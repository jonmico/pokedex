import styled from 'styled-components';

import { useEffect, useState } from 'react';

import { PokemonCallItem, PokemonDataType } from '../types';
import PokemonHeader from './PokemonHeader';
import PokemonFlavorText from './PokemonFlavorText';

const PokemonInfoDiv = styled.div`
  border: 1px solid black;
  width: 80%;
  min-width: 325px;
  /* height: 38.5rem; */
  padding: 10px;
  background-color: #ff8400;
  margin: 2rem auto;
  border-radius: 10px;
  overflow: auto;
`;

const PokemonSprite = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  background-color: #bacddb;
  width: 90%;
  margin: 1.5rem auto 0.75rem auto;
  img {
    width: 300px;
    display: block;
    margin: auto;
  }
`;

const PokemonDataWrapper = styled.div`
  padding: 0 25px;
`;

const CaughtButton = styled.button`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 15px 10px;
  margin: 1.5rem auto 1.5rem auto;
  background-color: #ff8400;
  font-family: Silkscreen;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:active {
    background-color: #bacddb;
  }
`;

const Pokeball = styled.img`
  display: block;
  margin-left: 0.5rem;
  width: 25px;
`;

interface PokemonInfoProps {
  pokemon: PokemonCallItem | null;
  onAddCaught: () => void;
}

export default function PokemonInfo({
  pokemon,
  onAddCaught,
}: PokemonInfoProps) {
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
      <PokemonDataWrapper>
        <PokemonHeader pokemon={pokemonData} />
        <PokemonFlavorText pokemon={pokemonData} />
        <CaughtButton onClick={onAddCaught}>
          <span>Caught</span>
          <Pokeball
            src={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png'
            }
            alt='Pokeball Icon'
          ></Pokeball>
        </CaughtButton>
      </PokemonDataWrapper>
    </PokemonInfoDiv>
  );
}
