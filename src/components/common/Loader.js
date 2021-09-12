import styled from 'styled-components/macro';
import Spinner from './Spinner';
import loginBackground from '../../images/loginBackground.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loader;
