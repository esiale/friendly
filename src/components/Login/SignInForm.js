import styled from 'styled-components/macro';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0px 15px 20px 15px;
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
`;

const Error = styled.p`
  height: 0.9rem;
  margin: 5px 0 0 0;
  color: rgb(204, 0, 0);
  font-size: 0.9rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
  font-weight: 600;
  text-align: right;
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

const SignUp = styled.p`
  color: #fff;
  margin: 10px 0 0 0;
  text-align: center;
`;

const Span = styled.span`
  font-weight: 600;
`;

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'Must be at least 6 characters')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <StyledForm autoComplete="off" noValidate>
        <Label htmlFor="email">Email</Label>
        <StyledField name="email" type="email" />
        <ErrorMessage component={Error} name="email" />
        <Label htmlFor="password">Password</Label>
        <StyledField name="password" type="password" />
        <ErrorMessage component={Error} name="password" />
        <Button type="submit">Log In</Button>
        <SignUp>Don't have an account yet?</SignUp>
        <SignUp>
          Click <Span>here</Span> to make one!
        </SignUp>
      </StyledForm>
    </Formik>
  );
};

export default SignInForm;
