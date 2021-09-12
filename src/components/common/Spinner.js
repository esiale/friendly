import styled, { keyframes } from 'styled-components/macro';

const animate = keyframes`
    0%, 80%, 100% { 
      transform: scale(0);
    } 40% { 
      transform: scale(1.0);
    }
`;

const SpinnerWrapper = styled.div`
  margin: 20px;
  width: 70px;
  text-align: center;
`;

const SpinnerDiv = styled.div`
  width: 18px;
  height: 18px;
  background-color: rgba(253, 99, 3, 1);
  border-radius: 100%;
  display: inline-block;
  animation: ${animate} 1.4s infinite ease-in-out both;
`;

const Bounce1 = styled(SpinnerDiv)`
  animation-delay: -0.32s;
`;

const Bounce2 = styled(SpinnerDiv)`
  animation-delay: -0.16s;
`;

const Bounce3 = styled(SpinnerDiv)`
  animation-delay: -0.32s;
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </SpinnerWrapper>
  );
};

export default Spinner;
