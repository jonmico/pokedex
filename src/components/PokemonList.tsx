import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 70%;
  margin: 0 auto;
  font-family: Silkscreen;
  height: 60%;
  border: 1px solid black;
  overflow: auto;
  border-radius: 10px;
`;

interface PokemonListProps {
  children: React.ReactNode;
}

export default function PokemonList({ children }: PokemonListProps) {
  return <List>{children}</List>;
}
