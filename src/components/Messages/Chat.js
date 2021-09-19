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
  const { currentChat, userId, targetUserId } = props;
  // const messagesRef = useRef([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentChat) return;
    // const readStatusRef = doc(database, 'users', userId, 'chats', targetUserId);
    const unsubscribeFromChat = onSnapshot(
      collection(database, 'chats', currentChat, 'messages'),
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            setMessages((messages) => [...messages, change.doc.data()]);
            // await updateDoc(readStatusRef, { read: true });
          }
        });
      }
    );

    return () => unsubscribeFromChat();
  }, [currentChat]);

  return (
    <Wrapper>
      <MessagesWrapper>
        {messages.map((message) => (
          <p>{message.message}</p>
        ))}
      </MessagesWrapper>
    </Wrapper>
  );
};

export default Chat;
