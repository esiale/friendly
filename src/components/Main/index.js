import { useState } from 'react';
import React from 'react';
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
  margin-top: 75px;
  display: flex;
  justify-content: center;
`;

const Main = (props) => {
  const [loading, setLoading] = useState(false);
  const { userId } = props;

  if (loading) return <AuthenticatedLoader />;

  return (
    <Wrapper>
      <Header userId={userId} />
      <Content>
        {React.cloneElement(props.children, { userId: userId })}
      </Content>
    </Wrapper>
  );
};

export default Main;
