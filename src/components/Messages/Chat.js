import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import database from '../../config/firebase.config';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MessagesWrapper = styled.div``;

const InputWrapper = styled.div``;

const Chat = (props) => {
  const { currentChat } = props;

  useEffect(() => {
    if (!currentChat) return;
    const unsubscribeFromChat = onSnapshot(
      collection(database, 'chats', currentChat, 'messages'),
      (snapshot) => {
        console.log(snapshot);
      }
    );

    return () => unsubscribeFromChat();
  });
  return (
    <Wrapper>
      <MessagesWrapper></MessagesWrapper>
      <InputWrapper>
        <form>
          <label htmlFor="message-input">
            <input type="text" />
          </label>
          <input type="submit" value="Send message" />
        </form>
      </InputWrapper>
    </Wrapper>
  );
};

export default Chat;
