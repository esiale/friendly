import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import Preview from './Preview';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { Button, Paragraph } from './SignInForm';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const StyledInputButton = styled(Button)`
  padding: 10px 8px;
  width: 50%;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 50%;
  text-align: center;
`;

const StyledFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &:hover,
  &:focus + ${StyledInputButton} {
    background-color: rgb(245, 174, 61);
    transform: scale(1.05);
    outline: 0;
  }
`;

const CropperContainer = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const ErrorBox = styled.div`
  color: rgb(204, 0, 0);
  font-size: 1rem;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.9);
  height: 1rem;
  text-align: center;
`;

const Step2 = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [upImg, setUpImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const croppedCanvas = useRef(null);
  const cropperRef = useRef(null);

  const { setTitle, newUserData, setStep } = props;

  useEffect(() => {
    setTitle('Import profile picture');
  }, [setTitle]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size >= 4194304)
        return setErrorMessage('File too large!');
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        if (image.width < 350 || image.height < 350) {
          setErrorMessage('Picture is too small');
          setUpImg(null);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCancel = (e) => {
    e.currentTarget.blur();
    setUpImg(null);
    setShowPreview(false);
    setErrorMessage(null);
  };

  const handlePreview = async (e) => {
    e.currentTarget.blur();
    croppedCanvas.current = await getCroppedCanvas();
    setShowPreview(true);
  };

  const getCroppedCanvas = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;
    return cropper.getCroppedCanvas({
      width: 450,
      height: 450,
      minWidth: 450,
      minHeight: 450,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    });
  };

  const uploadImage = async (e) => {
    e.currentTarget.blur();
    await croppedCanvas.current.toBlob(async (blob) => {
      newUserData.picture = blob;
    }, 'image/jpeg');
    setStep('step3');
  };

  if (!upImg)
    return (
      <Wrapper>
        <StyledFileInput
          name="file"
          id="file"
          type="file"
          onChange={onSelectFile}
          accept="image/*"
        />
        <ErrorBox>{errorMessage}</ErrorBox>
        <ButtonsContainer>
          <StyledInputButton as="label" htmlFor="file">
            Upload picture
          </StyledInputButton>
          <StyledInputButton onClick={() => setStep('step3')}>
            Skip
          </StyledInputButton>
        </ButtonsContainer>
        <Paragraph>Min. 450x450 px</Paragraph>
        <Paragraph>Max. size 4mb</Paragraph>
      </Wrapper>
    );

  return (
    <Wrapper>
      {showPreview ? (
        <Preview
          canvas={croppedCanvas.current}
          handleCancel={handleCancel}
          uploadImage={uploadImage}
        />
      ) : (
        <>
          <CropperContainer>
            <Cropper
              src={upImg}
              initialAspectRatio={1}
              dragMode="move"
              viewMode={1}
              aspectRatio={1}
              ref={cropperRef}
              minCropBoxWidth={150}
              minCropBoxHeight={150}
              minCanvasWidth={300}
              minCanvasHeight={300}
            />
          </CropperContainer>
          <StyledButton onClick={handlePreview}>Submit</StyledButton>
        </>
      )}
    </Wrapper>
  );
};

export default Step2;
