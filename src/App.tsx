import './index.css';
import { styled } from 'styled-components';

// hex code for the e on linux is ctrl + shift + u 00E9

const MainWrapper = styled.div`
  width: 60%;
  min-width: 500px;
  margin: auto;
`;

const Header = styled.h1`
  font-family: Silkscreen;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
`;

const PokedexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokedexHalf = styled.div`
  height: 700px;
  width: 800px;
  background-color: red;
  margin: 0 5px 0 5px;
  overflow: auto;
`;

export default function App() {
  return (
    <MainWrapper>
      <Header>Pokédex</Header>
      <PokedexWrapper>
        <PokedexHalf></PokedexHalf>
        <PokedexHalf></PokedexHalf>
      </PokedexWrapper>
    </MainWrapper>
  );
}
