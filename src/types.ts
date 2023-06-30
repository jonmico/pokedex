export type PokemonCallItem = {
  name: string;
  url: string;
};

export type PokemonType = {
  id: number;
  name: string;
};

export type PokemonDataType = PokemonType & {
  sprites: { front_default: string };
  weight: number;
  height: number;
  types: [];
};
