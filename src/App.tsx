import React, { useState, useEffect } from 'react';

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
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 1.25rem auto;
  text-align: center;
`;

const PokedexHalfList = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  background-color: #cc322a;
  margin: 0 5px 0 5px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black, -1px -1px 5px black;
`;

const PokedexHalfInfo = styled(PokedexHalfList)`
  justify-content: center;
`;

const GenerationSelect = styled.select`
  margin-top: 2rem;
  font-family: Silkscreen;
  width: 50%;
  background-color: #ff8400;
  border: none;
  height: 35px;
`;

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonCallItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonCallItem | null>(null);
  const [isPokemonSelected, setIsPokemonSelected] = useState(false);
  const [caughtList, setCaughtList] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [textFilter, setTextFilter] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState<
    PokemonCallItem[]
  >([]);

  useEffect(() => {
    async function fetchInitialPokemonList() {
      let offset = 0;
      let limit = 0;

      switch (selectedGeneration) {
        case 'gen-1':
          offset = 0;
          limit = 151;
          break;
        case 'gen-2':
          offset = 151;
          limit = 100;
          break;
        case 'gen-3':
          offset = 251;
          limit = 135;
      }
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      const data = await res.json();

      setPokemonList([...data.results]);
    }
    fetchInitialPokemonList();
  }, [selectedGeneration]);

  useEffect(() => {
    const newFilteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.includes(textFilter.toLowerCase())
    );
    setFilteredPokemonList(newFilteredPokemon);
  }, [pokemonList, textFilter]);

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
      if (caughtList.includes(pokemon.name)) {
        setCaughtList((currCaughtList) =>
          currCaughtList.filter((p) => p !== pokemon.name)
        );
      } else {
        setCaughtList((currCaughtList) => [...currCaughtList, pokemon.name]);
      }
    }
  }

  function handleClosePokemonInfo() {
    setSelectedPokemon(null);
    setIsPokemonSelected(false);
  }

  return (
    <MainWrapper>
      <PokedexHalfList>
        <Header>Pokédex</Header>
        {selectedGeneration && (
          <>
            <input
              type='text'
              placeholder='Filter by name'
              value={textFilter}
              onChange={(evt) => setTextFilter(evt.target.value)}
            />
            <PokemonList>
              {filteredPokemonList &&
                filteredPokemonList.map((pokemon) => (
                  <PokemonListItem
                    key={pokemon.name}
                    pokemonItem={pokemon}
                    onSelectPokemon={() => onSelectPokemon(pokemon)}
                    caughtList={caughtList}
                    selectedPokemon={selectedPokemon}
                  />
                ))}
            </PokemonList>
          </>
        )}
        <GenerationSelect
          value={selectedGeneration}
          name='generation-picker'
          id='generation-picker'
          onChange={(evt) => setSelectedGeneration(evt.target.value)}
        >
          <option value=''>Choose a Generation</option>
          <option value='gen-1'>Gen I</option>
          <option value='gen-2'>Gen II</option>
          <option value='gen-3'>Gen III</option>
        </GenerationSelect>
      </PokedexHalfList>
      <PokedexHalfInfo>
        {isPokemonSelected && (
          <PokemonInfo
            onClose={handleClosePokemonInfo}
            pokemon={selectedPokemon}
            onAddCaught={() => handleAddCaught(selectedPokemon)}
            caughtList={caughtList}
          />
        )}
      </PokedexHalfInfo>
    </MainWrapper>
  );
}
