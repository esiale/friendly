import { useEffect, useState, useRef } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import database from '../../config/firebase.config';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MessagesWrapper = styled.div``;

const Chat = (props) => {
  const { chats } = props;

  return (
    <Wrapper>
      <MessagesWrapper></MessagesWrapper>
    </Wrapper>
  );
};

export default Chat;
