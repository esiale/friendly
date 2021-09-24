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
  const {
    chats,
    userId,
    setCurrentChat,
    currentChat,
    listVisible,
    markAsRead,
  } = props;

  const handleClick = async (index) => {
    await markAsRead(index);
    setCurrentChat(index);
  };

  const filterEmptyChats = (chats) => {
    const noEmptyChatsList = chats.filter((chat) => {
      if (chat.messages.length) return chat;
      return false;
    });
    return noEmptyChatsList;
  };

  const sortChatsByTimestamp = (chats) => {
    const sortedChats = chats.sort((a, b) => {
      const aTimestamp = a.messages.slice(-1)[0].timestamp;
      const bTimestamp = b.messages.slice(-1)[0].timestamp;
      return bTimestamp - aTimestamp;
    });
    return sortedChats;
  };

  const filterAndSortChats = (chats) => {
    const noEmptyChatsList = filterEmptyChats(chats);
    if (noEmptyChatsList.length < 1) return noEmptyChatsList;
    const sortedChatsByTimestamp = sortChatsByTimestamp(noEmptyChatsList);
    console.log(sortedChatsByTimestamp);
    return sortedChatsByTimestamp;
  };

  return (
    <Wrapper listVisible={listVisible}>
      <Header>
        {filterAndSortChats(chats).length
          ? 'Your chats'
          : 'Your chat list is empty'}
      </Header>
      {filterAndSortChats(chats).map((chat) => (
        <ListUser
          key={uniqid()}
          chat={chat}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          index={chats.indexOf(chat)}
          handleClick={handleClick}
          userId={userId}
        />
      ))}
    </Wrapper>
  );
};

export default List;
