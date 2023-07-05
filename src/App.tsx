import { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import PokemonList from './components/PokemonList';
import PokemonListItem from './components/PokemonListItem';
import PokemonInfo from './components/PokemonInfo';

import { PokemonCallItem } from './types';

import './index.css';

// hex code for the e on linux is ctrl + shift + u 00E9

const MainWrapper = styled.div`
  width: 75%;
  min-width: 950px;
  margin: 3.25rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 auto 1rem auto;
  text-align: center;
`;

const PokedexHalf = styled.div`
  /* height: 800px;
  width: 600px; */
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  background-color: #cc322a;
  margin: 0 5px 0 5px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black, -1px -1px 5px black;
`;

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonCallItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonCallItem | null>(null);
  const [isPokemonSelected, setIsPokemonSelected] = useState(false);
  const [caughtList, setCaughtList] = useState<string[]>([]);

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

  function onSelectPokemon(pokemon: PokemonCallItem) {
    if (selectedPokemon?.name === pokemon.name) {
      setSelectedPokemon(null);
      setIsPokemonSelected(false);
    } else {
      setSelectedPokemon(pokemon);
      setIsPokemonSelected(true);
    }
  }

  function handleAddCaught(pokemon: PokemonCallItem | null) {
    if (pokemon) {
      if (caughtList.includes(pokemon.name)) return;
      setCaughtList((currCaughtList) => [...currCaughtList, pokemon.name]);
    }
  }

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
                onSelectPokemon={() => onSelectPokemon(pokemon)}
                caughtList={caughtList}
              />
            ))}
        </PokemonList>
      </PokedexHalf>
      <PokedexHalf>
        {isPokemonSelected && (
          <PokemonInfo
            pokemon={selectedPokemon}
            onAddCaught={() => handleAddCaught(selectedPokemon)}
          />
        )}
      </PokedexHalf>
    </MainWrapper>
  );
}
