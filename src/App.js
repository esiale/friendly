import GlobalStyle from './theme/globalStyles';
import styled from 'styled-components/macro';
import Login from './components/Login';
import background from './images/background.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${background});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Login />
      </Wrapper>
    </>
  );
};

export default App;
