import styled from 'styled-components';
import { PokemonDataType } from '../types';

const Header = styled.div`
  margin-bottom: 1rem;
`;

const StyledH2 = styled.h2`
  margin: 0 0 0.25rem 0;
`;

const PokemonMiscData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface PokemonHeaderProps {
  pokemon: PokemonDataType | null;
}

export default function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
    <Header>
      <StyledH2>{pokemon?.name}</StyledH2>
      <PokemonMiscData>
        <div>
          {pokemon?.types.map(
            (type: { slot: number; type: { name: string } }) => (
              <div key={type.type.name}>
                <span>{type.type.name}</span>
              </div>
            )
          )}
        </div>
        <div>
          <div>
            <span>Weight: {pokemon?.weight} hg</span>
          </div>
          <div>
            <span>Height: {pokemon?.height} dm</span>
          </div>
        </div>
      </PokemonMiscData>
    </Header>
  );
}
