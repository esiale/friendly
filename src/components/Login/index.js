import styled from 'styled-components/macro';
import loginBackground from '../../images/loginBackground.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const LoginWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);
`;

const Login = (props) => {
  return (
    <Wrapper>
      <LoginWrapper>{props.children}</LoginWrapper>
    </Wrapper>
  );
};

export default Login;
