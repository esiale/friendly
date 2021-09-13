import styled from 'styled-components/macro';
import Spinner from './Spinner';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(255, 250, 250);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loader;
