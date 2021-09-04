import styled from 'styled-components/macro';
import SignInForm from './SignInForm';

const Wrapper = styled.div`
  width: 280px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 125px;
  /* background-color: rgba(255, 255, 255, 0.3); */
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 20px 20px 0 0;
  padding-left: 15px;
`;

const H1 = styled.h1`
  font-size: 3rem;
  margin: 10px 0px; ;
`;

const H1span = styled.span`
  color: rgba(243, 156, 18, 1);
`;

const H2 = styled.h2`
  font-size: 1.3rem;
  margin: 0;
`;

const Login = () => {
  return (
    <Wrapper>
      <Header>
        <H1>
          Friend<H1span>ly</H1span>
        </H1>
        <H2>Your journey starts now</H2>
      </Header>
      <SignInForm />
    </Wrapper>
  );
};

export default Login;
