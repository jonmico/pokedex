import './index.css';
import styled from 'styled-components';

// hex code for the e on linux is ctrl + shift + u 00E9

const MainWrapper = styled.div`
  width: 75%;
  min-width: 1000px;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-family: Silkscreen;
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem auto;
  text-align: center;
`;

const PokedexHalf = styled.div`
  height: 700px;
  width: 500px;
  background-color: #cc322a;
  margin: 0 5px 0 5px;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black, -1px -1px 5px black;
`;

export default function App() {
  return (
    <MainWrapper>
      <PokedexHalf>
        <Header>Pokédex</Header>
      </PokedexHalf>
      <PokedexHalf></PokedexHalf>
    </MainWrapper>
  );
}
