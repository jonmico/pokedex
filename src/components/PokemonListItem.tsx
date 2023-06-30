import { useEffect, useState } from 'react';

import { PokemonCallItem, PokemonType } from '../types';

interface PokemonListItemProps {
  pokemonItem: PokemonCallItem;
}

export default function PokemonListItem({ pokemonItem }: PokemonListItemProps) {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const { url, name } = pokemonItem;

  useEffect(() => {
    async function getPokemonInfo() {
      const res = await fetch(url);
      const pokemonData = await res.json();
      setPokemon({ ...pokemonData });
    }
    getPokemonInfo();
  }, [url]);

  return <li>{pokemon && `${pokemon.name} ${pokemon.id}`}</li>;
}
