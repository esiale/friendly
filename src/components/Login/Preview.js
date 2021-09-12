import styled from 'styled-components/macro';
import { Button } from './SignInForm';

const Wrapper = styled.div``;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 50%;
  margin: 15px 10px 10px 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.4);
`;

const Image = styled.img`
  width: 100%;
`;

const Preview = (props) => {
  const { handleCancel, canvas, uploadImage } = props;

  return (
    <Wrapper>
      <ImageContainer>
        <Image src={canvas.toDataURL()} />
      </ImageContainer>
      <ButtonsContainer>
        <StyledButton onClick={(e) => uploadImage(e)}>Accept</StyledButton>
        <StyledButton onClick={(e) => handleCancel(e)}>Cancel</StyledButton>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Preview;
