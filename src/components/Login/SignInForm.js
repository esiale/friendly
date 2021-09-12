import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import * as Yup from 'yup';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 0px 20px 0px;
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
`;

const StyledField = styled(Field)`
  border: 0;
  border-bottom: 2px rgba(var(--accent), 0.8) solid;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 7px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  transition: transform 300ms;
  &:focus {
    outline: none;
    transform: scale(1.05);
  }
  &:-webkit-autofill {
    transition: background-color 600000s 0s, color 600000s 0s, transform 300ms !important;
  }
`;

const ErrorBox = styled.div`
  height: 0.9rem;
  margin: 5px 0 0 0;
`;

const Error = styled.p`
  margin: 0;
  color: rgb(204, 0, 0);
  font-size: 0.9rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
  text-align: right;
`;

const AuthenticationError = styled(Error)`
  text-align: center;
  font-size: 1rem;
`;

const Label = styled.label`
  margin: 10px 0;
`;

const Button = styled.button`
  border: 0;
  border-radius: 20px;
  background-color: rgba(var(--accent), 1);
  margin: 15px 0 10px 0;
  padding: 10px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  transition: all 300ms;

  &:hover,
  &:focus {
    background-color: rgb(245, 174, 61);
    transform: scale(1.05);
    outline: 0;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 125px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 5px 5px 0 0;
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

const SignUpPara = styled.p`
  color: #fff;
  margin: 5px 0 0 0;
  text-align: center;
  cursor: pointer;
  white-space: pre;
  line-height: 1.5;
`;

const Span = styled.span`
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Paragraph = styled.p`
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: center;
`;

const SignInForm = (props) => {
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setError('Wrong email and/or password');
      console.error(error);
    });
  };

  return (
    <Wrapper>
      <Header>
        <H1>
          Friend<H1span>ly</H1span>
        </H1>
        <H2>Your journey starts now</H2>
      </Header>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          signIn(values.email, values.password);
        }}
      >
        <StyledForm autoComplete="off" noValidate>
          <Label htmlFor="email">Email</Label>
          <StyledField name="email" type="email" />
          <ErrorBox>
            <ErrorMessage component={Error} name="email" />
          </ErrorBox>
          <Label htmlFor="password">Password</Label>
          <StyledField
            name="password"
            type="password"
            autoComplete="password"
          />
          <ErrorBox>
            <ErrorMessage component={Error} name="password" />
          </ErrorBox>
          <ErrorBox>
            <AuthenticationError>{error}</AuthenticationError>
          </ErrorBox>
          <Button type="submit" onClick={(e) => e.currentTarget.blur()}>
            Log In
          </Button>
        </StyledForm>
      </Formik>
      <StyledLink to={`/register`}>
        <SignUpPara>
          Don't have an account yet? {'\n'} Click <Span>here</Span> to make one!
        </SignUpPara>
      </StyledLink>
      <Paragraph>
        This website exists for demonstration purposes only. Please refrain from
        uploading or posting vulgar/sexually explicit content.
      </Paragraph>
    </Wrapper>
  );
};

export default SignInForm;
export { StyledForm, StyledField, Button, Error, ErrorBox, Label, Paragraph };
