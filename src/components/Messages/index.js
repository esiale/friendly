import { useEffect, useState } from 'react';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components/macro';
import Chat from './Chat';
import List from './List';
import Header from './Header';
import database from '../../config/firebase.config';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Messages = (props) => {
  const [currentChat, setCurrentChat] = useState(null);
  const { userId } = props;

  useEffect(() => {
    const initiateChat = async (targetUser) => {
      const chatroom = `${
        userId < targetUser
          ? `${userId}_${targetUser}`
          : `${targetUser}_${userId}`
      }`;
      const chatsRef = doc(database, 'chats', chatroom);
      const docSnap = await getDoc(chatsRef);
      if (!docSnap.exists()) {
        await setDoc(chatsRef, { empty: true });
      }
      setCurrentChat(chatroom);
    };
    if (props.location.targetUser) {
      initiateChat(props.location.targetUser.userId);
    }
  }, [userId, props.location.targetUser]);

  return (
    <Wrapper>
      {props.location.targetUser ? (
        <Header targetUserId={props.location.targetUser.userId} />
      ) : (
        <Header />
      )}
      <List />
      <Chat currentChat={currentChat} />
    </Wrapper>
  );
};

export default Messages;
