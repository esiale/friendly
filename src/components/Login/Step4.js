import { useEffect } from 'react';
import Spinner from '../common/Spinner';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 10px;
`;

const Step4 = (props) => {
  const { setTitle } = props;

  useEffect(() => setTitle('Creating new user...'));

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Step4;
