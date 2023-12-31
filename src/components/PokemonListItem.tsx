import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { PokemonCallItem, PokemonType } from '../types';

interface ListItemProps {
  $isSelected: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 10px 5px;
  border: 1px solid black;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#a7b9d3' : '#ff8400'};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;

interface PokeballProps {
  $isCaught: boolean;
}

const Pokeball = styled.img<PokeballProps>`
  width: 25px;
  opacity: ${({ $isCaught }) => ($isCaught ? 1 : 0.2)};
  padding-right: 10px;
`;

const PokemonInfoWrapper = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const PokemonId = styled.p`
  padding: 0;
  margin: 0;
  width: 30%;
  font-size: 1rem;
`;

interface PokemonListItemProps {
  pokemonItem: PokemonCallItem;
  selectedPokemon: PokemonCallItem | null;
  onSelectPokemon: () => void;
  caughtList: string[];
}

export default function PokemonListItem({
  pokemonItem,
  caughtList,
  selectedPokemon,
  onSelectPokemon,
}: PokemonListItemProps) {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const { url } = pokemonItem;

  const isCaught = caughtList.includes(pokemonItem.name);
  const isSelected = selectedPokemon?.name === pokemonItem.name;

  useEffect(() => {
    async function getPokemonInfo() {
      const res = await fetch(url);
      const pokemonData = await res.json();
      setPokemon({ ...pokemonData });
    }
    getPokemonInfo();
  }, [url]);

  return (
    <ListItem onClick={onSelectPokemon} $isSelected={isSelected}>
      <PokemonInfoWrapper>
        <PokemonId>{pokemon?.id}</PokemonId>
        <span>{pokemon?.name}</span>
      </PokemonInfoWrapper>

      <Pokeball
        $isCaught={isCaught}
        src={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png'
        }
        alt='Pokeball Icon'
      ></Pokeball>
    </ListItem>
  );
}
