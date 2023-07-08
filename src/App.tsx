import { useState, useEffect } from 'react';

import styled from 'styled-components';

import PokemonList from './components/PokemonList';
import PokemonListItem from './components/PokemonListItem';
import PokemonInfo from './components/PokemonInfo';

import { PokemonCallItem } from './types';

import './index.css';

// hex code for the e on linux is ctrl + shift + u 00E9

const MainWrapper = styled.div`
  width: 75%;
  min-width: 900px;
  max-width: 1100px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 950px) {
    flex-direction: column;
    width: 100%;
    min-width: 800px;
  }

  @media only screen and (max-width: 800px) {
    min-width: 325px;
  }
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 2rem auto 1.25rem auto;
  text-align: center;

  @media only screen and (max-width: 800px) {
    font-size: 2rem;
    margin: 0.5rem auto 1.25rem auto;
  }
`;

const PokedexHalfList = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-width: 400px;
  background-color: #cc322a;
  margin: 0 5px 0 5px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black, -1px -1px 5px black;

  box-sizing: border-box;

  @media only screen and (max-width: 950px) {
    padding: 1rem;
    height: auto;
    margin-bottom: 1rem;
    width: 80%;
    min-width: auto;
  }
  @media only screen and (max-width: 800px) {
    width: 90%;
    min-width: auto;
  }
`;

const PokedexHalfInfo = styled(PokedexHalfList)`
  justify-content: center;
`;

const GenerationSelect = styled.select`
  font-family: Silkscreen;
  width: 70%;
  background-color: #ff8400;
  border: 1px solid black;
  height: 2.5rem;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 1rem;

  @media only screen and (max-width: 950px) {
    width: 100%;
  }
`;

const SearchPokemon = styled.input`
  width: 70%;
  border: 1px solid black;
  padding: 0.25rem;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
  background-color: #ff8400;
  font-family: Silkscreen;
  height: 2.5rem;
  font-size: 1rem;

  @media only screen and (max-width: 950px) {
    width: 100%;
  }
`;

const StarterText = styled.p`
  text-align: center;
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
          break;
        default:
          limit = 0;
      }

      if (limit !== 0) {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();

        setPokemonList([...data.results]);
      }
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
        {selectedGeneration && (
          <>
            <SearchPokemon
              type='text'
              placeholder='Filter by name'
              value={textFilter}
              onChange={(evt) => setTextFilter(evt.target.value)}
            />
            <PokemonList>
              {filteredPokemonList.map((pokemon) => (
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
      </PokedexHalfList>
      <PokedexHalfInfo>
        {selectedGeneration === '' ? (
          <StarterText>Choose a generation to get started!</StarterText>
        ) : isPokemonSelected ? (
          <PokemonInfo
            onClose={handleClosePokemonInfo}
            pokemon={selectedPokemon}
            onAddCaught={() => handleAddCaught(selectedPokemon)}
            caughtList={caughtList}
          />
        ) : (
          <StarterText>Pick a pokemon to load its data!</StarterText>
        )}
      </PokedexHalfInfo>
    </MainWrapper>
  );
}
