import { useEffect, useState } from 'react';
import {
  setDoc,
  doc,
  getDoc,
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import AuthenticatedLoader from '../common/AuthenticatedLoader';
import styled from 'styled-components/macro';
import devices from '../../global/devices';
import Chat from './Chat';
import List from './List';
import Header from './Header';
import Input from './Input';
import Burger from './Burger';
import database from '../../config/firebase.config';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${devices.tablet} {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'list header'
      'list chat'
      'list input';
  }
`;

const Messages = (props) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [listVisible, setListVisible] = useState(false);
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);
  const { userId } = props;

  const toggleListVisible = () => setListVisible((prev) => !prev);

  useEffect(() => {
    const checkIfChatExists = async (chatroomId) => {
      const chatRef = doc(database, 'messages', chatroomId);
      const docSnap = await getDoc(chatRef);
      if (docSnap.exists()) return true;
      return false;
    };

    const findChat = (chatsList, userId) => {
      if (!chatsList.length) return false;
      for (let i = 0; i < chatsList.length; i++) {
        if (chatsList[i].users.includes(userId)) return i;
      }
      return false;
    };

    const createChat = async (chatroomName, targetUser) => {
      const newChatRef = doc(database, 'messages', chatroomName);
      await setDoc(newChatRef, {
        id: chatroomName,
        isRead: false,
        users: [userId, targetUser],
        messages: [],
      });
    };

    const generateChatroomName = (targetUser) => {
      return `${
        userId < targetUser
          ? `${userId}_${targetUser}`
          : `${targetUser}_${userId}`
      }`;
    };

    const initiateChat = async () => {
      if (!props.location.targetUser) return;
      const targetUser = props.location.targetUser.userId;
      const chatroomName = generateChatroomName(targetUser);
      const chatExists = await checkIfChatExists(chatroomName);
      if (chatExists && !chats.length) return;
      const chatId = findChat(chats, targetUser);
      if (chatExists) {
        setCurrentChat(chatId);
      } else {
        setIsCreatingNewChat(true);
        await createChat(chatroomName, targetUser);
      }
    };
    initiateChat();
  }, [chats, props.location.targetUser, userId]);

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
        const chatWithUserData = { ...targetUserData, ...change.doc.data() };
        if (change.type === 'added') {
          setChats((prev) => [...prev, chatWithUserData]);
        }
        if (change.type === 'modified') {
          const databaseChatId = change.doc.id;
          setChats((prev) => {
            const updatedChatList = prev.map((chat) => {
              if (chat.id === databaseChatId) {
                return chatWithUserData;
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

  useEffect(() => {
    if (isCreatingNewChat) {
      setCurrentChat((prev) => prev + 1);
      setIsCreatingNewChat(false);
    }
  }, [isCreatingNewChat]);

  const sendMessage = async (message) => {
    if (currentChat === null) return;
    const docRef = doc(database, 'messages', chats[currentChat].id);
    await updateDoc(docRef, {
      messages: arrayUnion({
        message: message,
        sender: userId,
        timestamp: Date.now(),
      }),
      isRead: false,
    });
  };

  const markAsRead = async (index) => {
    if (!chats.length || !index) return;
    const lastMessage = chats[index].messages.slice(-1);
    if (chats[index].isRead || lastMessage.sender === userId) return;
    const docRef = doc(database, 'messages', chats[index].id);
    await updateDoc(docRef, { isRead: true });
  };

  if (isCreatingNewChat) return <AuthenticatedLoader />;

  return (
    <Wrapper>
      <Burger listVisible={listVisible} toggleListVisible={toggleListVisible} />
      <Header currentChat={currentChat} chats={chats} userId={userId} />
      <List
        chats={chats}
        userId={userId}
        setCurrentChat={setCurrentChat}
        currentChat={currentChat}
        listVisible={listVisible}
        markAsRead={markAsRead}
        toggleListVisible={toggleListVisible}
      />
      <Chat chat={chats[currentChat]} userId={userId} />
      <Input
        sendMessage={sendMessage}
        markAsRead={markAsRead}
        currentChat={currentChat}
      />
    </Wrapper>
  );
};

export default Messages;
