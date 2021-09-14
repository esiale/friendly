import { getAuth } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import AuthenticatedLoader from '../common/AuthenticatedLoader';
import styled from 'styled-components/macro';
import Header from './Header';

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
  const [loading, setLoading] = useState(false);
  const { userId } = props;

  if (loading) return <AuthenticatedLoader />;

  return (
    <Wrapper>
      <Header userId={userId} />
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default Main;
