import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import database from '../../config/firebase.config';
import uniqid from 'uniqid';
import styled from 'styled-components/macro';
import ListUser from './ListUser';
import devices from '../../global/devices';

const Wrapper = styled.div`
  grid-area: list;
  width: 320px;
  height: 100%;
  transform: ${({ listVisible }) =>
    listVisible ? 'translateX(0)' : 'translateX(-100%)'};
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(var(--background));
  transition: transform 0.3s ease-in-out;

  @media ${devices.tablet} {
    transform: initial;
    position: initial;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(var(--background));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);

  @media ${devices.tablet} {
    height: 20px;
    padding-bottom: 15px;
    justify-content: flex-start;
    padding-left: 10px;
  }
`;

const List = (props) => {
  const { chats, userId, setCurrentChat, currentChat, listVisible } = props;

  const handleClick = async (index) => {
    await MarkAsRead(index);
    setCurrentChat(index);
  };

  const MarkAsRead = async (index) => {
    const lastMessage = chats[index].messages.slice(-1);
    if (chats[index].isRead || lastMessage.sender === userId) return;
    const docRef = doc(database, 'messages', chats[index].id);
    await updateDoc(docRef, { isRead: true });
  };

  return (
    <Wrapper listVisible={listVisible}>
      <Header>{chats.length ? 'Your chats' : 'Your chat list is empty'}</Header>
      {chats.map((chat, index) => (
        <ListUser
          key={uniqid()}
          chat={chat}
          setCurrentChat={setCurrentChat}
          isActive={currentChat === index}
          index={index}
          handleClick={handleClick}
          userId={userId}
        />
      ))}
    </Wrapper>
  );
};

export default List;
