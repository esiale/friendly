import React from 'react';
import styled from 'styled-components/macro';
import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(var(--background), 1);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Main = (props) => {
  const { userId } = props;
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
