import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 70%;
  margin: 0 auto;
  font-family: Silkscreen;
  height: 75%;
  border: 1px solid black;
  overflow: auto;
  border-radius: 10px;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 10px 10px;
  margin: auto;
  font-size: 1.25rem;
  border: 1px solid black;
  background-color: #ff8400;
  font-family: Silkscreen;

  &:hover {
    opacity: 0.8;
    font-weight: bold;
    cursor: pointer;
  }
  &:active {
    background-color: #cc322a;
  }
  img {
    width: 50px;
  }
`;

interface PokemonListProps {
  onFetch: () => void;
  children: React.ReactNode;
}

export default function PokemonList({ children, onFetch }: PokemonListProps) {
  return (
    <List>
      {children}
      <LoadMoreButton onClick={onFetch}>Load More</LoadMoreButton>
    </List>
  );
}
