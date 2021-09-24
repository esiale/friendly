import { useEffect, useState, useRef } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Message from './Message';
import uniqid from 'uniqid';
import database from '../../config/firebase.config';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  grid-area: chat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Chat = (props) => {
  const { chat, userId } = props;

  return (
    <Wrapper>
      {chat
        ? chat.messages.map((message) => (
            <Message key={uniqid()} message={message} userId={userId} />
          ))
        : null}
    </Wrapper>
  );
};

export default Chat;
