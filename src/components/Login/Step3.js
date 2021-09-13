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
  const { newUserData, setTitle, setStep, registerNewUser } = props;

  useEffect(() => setTitle('Almost finished...'));

  return (
    <Wrapper>
      <Formik
        initialValues={{
          motto: '',
          about: '',
        }}
        validationSchema={Yup.object({
          motto: Yup.string().max(60, 'Must be less than 60 characters'),
          about: Yup.string().max(300, 'Must be less than 300 characters'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          newUserData.motto = values.motto;
          newUserData.about = values.about;
          setSubmitting(false);
          registerNewUser();
        }}
      >
        <StyledStepForm autoComplete="off" noValidate>
          <Label htmlFor="motto">What's your motto?</Label>
          <StyledTextArea component="textarea" name="motto" rows="2" />
          <ErrorBox>
            <ErrorMessage component={Error} name="motto" />
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
