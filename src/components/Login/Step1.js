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
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
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
`;

const Step1 = (props) => {
  const { newUserData, setStep } = props;

  // Yup handles custom tests asynchronously which results in database call being made before previous validations are met.
  // This resulted in Firebase throwing errors because of invalid e-mail.
  // Writing a separate function to handle all validation in Yup might seem counterintuitive but is the cleanest solution.

  const validateEmail = async (email) => {
    if (!email) return 'Required';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const auth = getAuth();
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (!signInMethods.length) return true;
      return 'An account with this email already exists';
    } else return 'Invalid e-mail';
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(30, 'Must be less than 30 characters')
            .required('Required'),
          lastName: Yup.string()
            .max(30, 'Must be less than 30 characters')
            .required('Required'),
          email: Yup.string().test(
            'emailValidation',
            'Email Validation Error',
            function (value) {
              return validateEmail(value)
                .then((response) => {
                  if (response === true) return true;
                  return this.createError({ message: response });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          ),
          password: Yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            "Passwords don't match"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          newUserData.firstName = values.firstName;
          newUserData.lastName = values.lastName;
          newUserData.email = values.email;
          newUserData.password = values.password;
          setSubmitting(false);
          setStep('step2');
        }}
      >
        <StyledStepForm autoComplete="off" noValidate>
          <Label htmlFor="firstName">First name</Label>
          <StyledField name="firstName" type="text" />
          <ErrorBox>
            <ErrorMessage component={Error} name="firstName" />
          </ErrorBox>
          <Label htmlFor="lastName">Last name</Label>
          <StyledField name="lastName" type="text" />
          <ErrorBox>
            <ErrorMessage component={Error} name="lastName" />
          </ErrorBox>
          <Label htmlFor="email">Email</Label>
          <StyledField name="email" type="email" autoComplete="username" />
          <ErrorBox>
            <ErrorMessage component={Error} name="email" />
          </ErrorBox>
          <Label htmlFor="password">Password</Label>
          <StyledField
            name="password"
            type="password"
            autoComplete="new-password"
          />
          <ErrorBox>
            <ErrorMessage component={Error} name="password" />
          </ErrorBox>
          <Label htmlFor="passwordConfirmation">Repeat password</Label>
          <StyledField
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
          />
          <ErrorBox>
            <ErrorMessage component={Error} name="passwordConfirmation" />
          </ErrorBox>
          <Paragraph>
            Feel free to use a fake email address. For convenience, there's no
            email verification. Save your login credentials if you'd like to
            revisit in the future.
          </Paragraph>
          <Button type="submit" onClick={(e) => e.currentTarget.blur()}>
            Next
          </Button>
        </StyledStepForm>
      </Formik>
    </Wrapper>
  );
};

export default Step1;
