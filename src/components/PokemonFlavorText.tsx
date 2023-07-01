import styled from 'styled-components';
import { PokemonDataType } from '../types';
import { useState, useEffect } from 'react';

const FlavorTextDiv = styled.div`
  border-top: 1px solid black;
  padding: 0.5rem 0;
`;

const Text = styled.p`
  margin: 0;
`;

interface PokemonFlavorTextProps {
  pokemon: PokemonDataType | null;
}

export default function PokemonFlavorText({ pokemon }: PokemonFlavorTextProps) {
  const [flavorText, setFlavorText] = useState('');

  useEffect(() => {
    async function getFlavorText() {
      if (pokemon) {
        const { url } = pokemon.species;
        const res = await fetch(url);
        const data = await res.json();

        setFlavorText(data.flavor_text_entries.at(1).flavor_text);
      }
    }
    getFlavorText();
  }, [pokemon]);

  return (
    <FlavorTextDiv>
      <Text>{flavorText}</Text>
    </FlavorTextDiv>
  );
}
