import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import database from '../../config/firebase.config';
import uniqid from 'uniqid';
import styled from 'styled-components/macro';
import ListUser from './ListUser';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(var(--background));
`;

const List = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { chats, userId, setCurrentChat, currentChat } = props;

  const toggleMobileMenu = () => setIsVisible((prev) => !prev);

  const handleClick = async (index) => {
    await MarkAsRead(index);
    setCurrentChat(index);
  };

  const MarkAsRead = async (index) => {
    if (chats[index].isRead) return;
    const docRef = doc(database, 'messages', chats[index].id);
    await updateDoc(docRef, { isRead: true });
  };

  return (
    <Wrapper>
      {chats.map((chat, index) => (
        <ListUser
          key={uniqid()}
          chat={chat}
          setCurrentChat={setCurrentChat}
          isActive={currentChat === index}
          index={index}
          handleClick={handleClick}
        />
      ))}
    </Wrapper>
  );
};

export default List;
