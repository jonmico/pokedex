import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import PokemonList from './components/PokemonList';

import { PokemonCallItem } from './types';

import './index.css';

// hex code for the e on linux is ctrl + shift + u 00E9

const MainWrapper = styled.div`
  width: 75%;
  min-width: 1050px;
  margin: 3.25rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-family: Silkscreen;
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem auto 1.5rem auto;
  text-align: center;
`;

const PokedexHalf = styled.div`
  /* height: 800px;
  width: 600px; */
  height: 45rem;
  width: 30.5rem;
  background-color: #cc322a;
  margin: 0 5px 0 5px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black, -1px -1px 5px black;
`;

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonCallItem[] | null>([]);
  const nextUrl = useRef('');

  useEffect(() => {
    async function callPokemonList() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await res.json();

      nextUrl.current = data.next;

      console.log(nextUrl.current);

      setPokemonList([...data.results]);
    }
    callPokemonList();
  }, []);

  useEffect(() => {}, [pokemonList]);

  return (
    <MainWrapper>
      <PokedexHalf>
        <Header>Pokédex</Header>
        <PokemonList pokemonList={pokemonList} />
      </PokedexHalf>
      <PokedexHalf></PokedexHalf>
    </MainWrapper>
  );
}
