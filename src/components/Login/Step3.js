import {
  StyledForm,
  StyledField,
  Button,
  ErrorBox,
  Error,
  Label,
  Paragraph,
} from './ui';
import { Formik, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const StyledStepForm = styled(StyledForm)`
  padding: 0;
  margin: 0;
  text-align: center;
`;

const StyledTextArea = styled(StyledField)`
  resize: none;
`;

const Step3 = (props) => {
  const { newUserData, setTitle, registerNewUser } = props;

  useEffect(() => setTitle('Almost finished...'));

  return (
    <Wrapper>
      <Formik
        initialValues={{
          location: '',
          about: '',
        }}
        validationSchema={Yup.object({
          location: Yup.string().max(20, 'Must be less than 20 characters'),
          about: Yup.string().max(600, 'Must be less than 600 characters'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          newUserData.location = values.location;
          newUserData.about = values.about;
          setSubmitting(false);
          registerNewUser();
        }}
      >
        <StyledStepForm autoComplete="off" noValidate>
          <Label htmlFor="location">What's your location?</Label>
          <StyledField name="location" />
          <ErrorBox>
            <ErrorMessage component={Error} name="location" />
          </ErrorBox>
          <Label htmlFor="about">Tell us more about yourself</Label>
          <StyledTextArea component="textarea" name="about" rows="6" />
          <ErrorBox>
            <ErrorMessage component={Error} name="about" />
          </ErrorBox>
          <Paragraph>
            These fields are optional but please fill them out for a better
            experience
          </Paragraph>
          <Button type="submit" onClick={(e) => e.currentTarget.blur()}>
            Next
          </Button>
        </StyledStepForm>
      </Formik>
    </Wrapper>
  );
};

export default Step3;
