import { getAuth } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import AuthenticatedLoader from '../common/AuthenticatedLoader';
import styled from 'styled-components/macro';
import Header from './Header';
import database from '../../config/firebase.config';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 250, 250, 1);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;

const Main = (props) => {
  const [loading, setLoading] = useState(true);
  const userData = useRef({
    uid: null,
    firstName: null,
    picture: null,
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const auth = getAuth();
      try {
        const uid = await auth.currentUser.uid;
        const docRef = doc(database, 'users', uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        userData.current = {
          uid: uid,
          firstName: data.firstName,
          picture: data.picture,
        };
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  if (loading) return <AuthenticatedLoader />;

  return (
    <Wrapper>
      <Header userData={userData.current} />
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default Main;
