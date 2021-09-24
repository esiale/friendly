import { useEffect, useState, useRef } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import uniqid from 'uniqid';
import database from '../../config/firebase.config';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  grid-area: chat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MessagesWrapper = styled.div``;

const Chat = (props) => {
  const { chat } = props;

  return (
    <Wrapper>
      <MessagesWrapper>
        {chat ? (
          chat.messages.map((message) => (
            <div key={uniqid()}>{message.message}</div>
          ))
        ) : (
          <p>null</p>
        )}
      </MessagesWrapper>
    </Wrapper>
  );
};

export default Chat;
