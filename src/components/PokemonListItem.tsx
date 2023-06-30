import { useEffect } from 'react';

import { PokemonCallItem } from '../types';

interface PokemonListItemProps {
  pokemon: PokemonCallItem;
}

export default function PokemonListItem({ pokemon }: PokemonListItemProps) {
  const { name, url } = pokemon;

  useEffect(() => {
    async function getPokemonInfo() {
      const res = await fetch(url);
      const pokemonData = await res.json();
      console.log(pokemonData);
    }
    getPokemonInfo();
  }, [url]);

  return <li>{name}</li>;
}
