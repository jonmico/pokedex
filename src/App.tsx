import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import PokemonList from './components/PokemonList';
import PokemonListItem from './components/PokemonListItem';

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
  const [pokemonList, setPokemonList] = useState<PokemonCallItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [isPokemonSelected, setIsPokemonSelected] = useState(false);

  const nextUrl = useRef('https://pokeapi.co/api/v2/pokemon/');

  useEffect(() => {
    async function fetchInitialPokemonList() {
      const res = await fetch(nextUrl.current);
      const data = await res.json();

      nextUrl.current = data.next;

      setPokemonList([...data.results]);
    }
    fetchInitialPokemonList();
  }, []);

  async function handleFetchClick() {
    const res = await fetch(nextUrl.current);
    const data = await res.json();

    nextUrl.current = data.next;
    setPokemonList((currPokemonList) => [...currPokemonList, ...data.results]);
  }

  function onSelectPokemon(name: string) {
    selectedPokemon === name
      ? setSelectedPokemon('')
      : setSelectedPokemon(name);
    selectedPokemon === name
      ? setIsPokemonSelected(false)
      : setIsPokemonSelected(true);
  }

  console.log(selectedPokemon);
  console.log(isPokemonSelected);

  return (
    <MainWrapper>
      <PokedexHalf>
        <Header>Pokédex</Header>
        <PokemonList onFetch={handleFetchClick}>
          {pokemonList &&
            pokemonList.map((pokemon) => (
              <PokemonListItem
                key={pokemon.name}
                pokemonItem={pokemon}
                onSelectPokemon={() => onSelectPokemon(pokemon.name)}
              />
            ))}
        </PokemonList>
      </PokedexHalf>
      <PokedexHalf></PokedexHalf>
    </MainWrapper>
  );
}
