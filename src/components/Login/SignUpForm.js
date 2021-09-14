import { useState, useRef } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components/macro';
import uniqid from 'uniqid';
import database from '../../config/firebase.config';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 50px;
  border-radius: 5px 5px 0 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const StyledPara = styled.p`
  font-weight: 600;
  margin-top: 15px;
  font-size: 1.4rem;
`;

const SignUpForm = (props) => {
  const [step, setStep] = useState('step1');
  const [title, setTitle] = useState('Create new account');
  const newUserData = useRef({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    picture: null,
    location: null,
    about: null,
  });
  const { setIsCreatingNewUser } = props;

  const registerNewUser = async () => {
    setIsCreatingNewUser(true);
    const auth = getAuth();
    let pictureUrl = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserData.current.email,
        newUserData.current.password
      );
      const userId = userCredential.user.uid;
      const storage = getStorage();
      if (newUserData.current.picture === null) {
        const storageRef = ref(storage, 'users/default.jpg');
        pictureUrl = await getDownloadURL(storageRef);
      } else {
        const storageRef = ref(storage, `users/${userId}/${uniqid()}.jpg`);
        await uploadBytes(storageRef, newUserData.current.picture);
        pictureUrl = await getDownloadURL(storageRef);
      }
      await setDoc(doc(database, 'users', userId), {
        firstName: newUserData.current.firstName,
        lastName: newUserData.current.lastName,
        location: newUserData.current.location,
        about: newUserData.current.about,
        picture: pictureUrl,
      });
      setIsCreatingNewUser(false);
    } catch (err) {
      console.log(err);
    }
  };

  const stepsEnums = {
    step1: (
      <Step1
        setStep={setStep}
        setTitle={setTitle}
        newUserData={newUserData.current}
      />
    ),
    step2: (
      <Step2
        setStep={setStep}
        setTitle={setTitle}
        newUserData={newUserData.current}
      />
    ),
    step3: (
      <Step3
        setStep={setStep}
        setTitle={setTitle}
        newUserData={newUserData.current}
        registerNewUser={registerNewUser}
      />
    ),
  };

  const EnumState = ({ state }) => {
    return <>{stepsEnums[state]}</>;
  };

  return (
    <Wrapper>
      <Header>
        <StyledPara>{title}</StyledPara>
      </Header>
      <EnumState state={step}></EnumState>
    </Wrapper>
  );
};

export default SignUpForm;
