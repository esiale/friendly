import { useEffect, useState } from 'react';
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Messages = (props) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { userId } = props;

  useEffect(() => {
    const filterTargetUserId = (chat) => {
      return chat.users.find((item) => item !== userId);
    };

    const getTargetUserData = async (chat) => {
      const id = filterTargetUserId(chat);
      const docRef = doc(database, 'users', id);
      const snapshot = await getDoc(docRef);
      const userData = snapshot.data();
      return { targetUserName: userData.firstName, picture: userData.picture };
    };

    const chatsRef = collection(database, 'messages');
    const chatsQuery = query(
      chatsRef,
      where('users', 'array-contains', userId)
    );

    const unsubscribeFromChat = onSnapshot(chatsQuery, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const targetUserData = await getTargetUserData(change.doc.data());
        if (change.type === 'added') {
          setChats((prev) => [...prev, change.doc.data()]);
        }
        if (change.type === 'modified') {
          const databaseChatId = change.doc.id;
          setChats((prev) => {
            const updatedChatList = prev.map((chat) => {
              if (chat.id === databaseChatId) {
                return change.doc.data();
              }
              return chat;
            });
            return updatedChatList;
          });
        }
      });
    });
    return () => unsubscribeFromChat();
  }, [userId]);

  return (
    <Wrapper>
      {props.location.targetUser ? (
        <Header targetUserId={props.location.targetUser.userId} />
      ) : (
        <Header />
      )}
      <List
        chats={chats}
        userId={userId}
        setCurrentChat={setCurrentChat}
        currentChat={currentChat}
      />
      <Chat chats={chats} />
      <Input />
    </Wrapper>
  );
};

export default Messages;
