import { useEffect, useState } from 'react';
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import styled from 'styled-components/macro';
import Chat from './Chat';
import List from './List';
import Header from './Header';
import Input from './Input';
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
      // const initiatorChatRef = doc(
      //   database,
      //   'users',
      //   userId,
      //   'chats',
      //   targetUser
      // );
      // const receiverChatRef = doc(
      //   database,
      //   'users',
      //   targetUser,
      //   'chats',
      //   userId
      // );
      const docSnap = await getDoc(chatsRef);
      if (!docSnap.exists()) {
        await setDoc(chatsRef, { exists: true });
        // await setDoc(initiatorChatRef, { exists: true });
        // await setDoc(receiverChatRef, { exists: true });
      }
      setCurrentChat(chatroom);
    };
    if (props.location.targetUser) {
      initiateChat(props.location.targetUser.userId);
    }
  }, [userId, props.location.targetUser]);

  const sendMessage = async (message) => {
    const chatRef = collection(database, 'chats', currentChat, 'messages');
    // const readStatusRef = doc(
    //   database,
    //   'users',
    //   props.location.targetUser.userId,
    //   'chats',
    //   userId
    // );
    try {
      await addDoc(chatRef, {
        sender: userId,
        receipent: props.location.targetUser.userId,
        message: message,
        timestamp: serverTimestamp(),
      });
      // await setDoc(readStatusRef, { read: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {props.location.targetUser ? (
        <Header targetUserId={props.location.targetUser.userId} />
      ) : (
        <Header />
      )}
      <List />
      <Chat
        currentChat={currentChat}
        userId={userId}
        targetUserId={props.location.targetUser.userId}
      />
      <Input sendMessage={sendMessage} />
    </Wrapper>
  );
};

export default Messages;
