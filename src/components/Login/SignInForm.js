import { Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  StyledForm,
  StyledField,
  ErrorBox,
  Error,
  Label,
  Button,
  Paragraph,
} from './ui';
import * as Yup from 'yup';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 0px 20px 0px;
`;

const AuthenticationError = styled(Error)`
  text-align: center;
  font-size: 1rem;
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

const Para = styled.p`
  font-size: 1.3rem;
  margin: 0;
  font-weight: 600;
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

const Logo = styled.p`
  font-weight: 600;
  font-size: 3rem;
  margin: 10px 0px;
  color: #fff;
`;

const LogoSpan = styled.span`
  color: rgba(243, 156, 18, 1);
`;

const SignInForm = (props) => {
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setError('Wrong email and/or password');
      console.error(error);
    });
  };

  return (
    <Wrapper>
      <Header>
        <Logo>
          Friend<LogoSpan>ly</LogoSpan>
        </Logo>
        <Para>Your journey starts now</Para>
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
