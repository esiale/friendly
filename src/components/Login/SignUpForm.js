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
import Step4 from './Step4';

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

const StyledH1 = styled.h1`
  margin-top: 15px;
  font-size: 1.4rem;
`;

const SignUpForm = () => {
  const [step, setStep] = useState('step1');
  const [title, setTitle] = useState('Create new account');
  const newUserData = useRef({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    picture: null,
    motto: null,
    about: null,
  });

  const registerNewUser = async () => {
    const auth = getAuth();
    let pictureUrl = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserData.current.email,
        newUserData.current.password
      );
      const userID = userCredential.user.uid;
      const storage = getStorage();
      if (newUserData.current.picture === null) {
        const storageRef = ref(storage, 'users/default.jpg');
        pictureUrl = await getDownloadURL(storageRef);
      } else {
        const storageRef = ref(storage, `users/${userID}/${uniqid()}.jpg`);
        await uploadBytes(storageRef, newUserData.current.picture);
        pictureUrl = await getDownloadURL(storageRef);
      }
      await setDoc(doc(database, 'users', userID), {
        firstName: newUserData.current.firstName,
        lastName: newUserData.current.lastName,
        motto: newUserData.current.motto,
        about: newUserData.current.about,
        picture: pictureUrl,
      });
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
    step4: <Step4 setTitle={setTitle} />,
  };

  const EnumState = ({ state }) => {
    return <>{stepsEnums[state]}</>;
  };

  return (
    <Wrapper>
      <Header>
        <StyledH1>{title}</StyledH1>
      </Header>
      <EnumState state={step}></EnumState>
    </Wrapper>
  );
};

export default SignUpForm;
