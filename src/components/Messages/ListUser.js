import styled from 'styled-components/macro';
import devices from '../../global/devices';

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  background-color: ${(isActive) =>
    isActive ? 'rgb(246, 184, 85)' : 'rgb(240, 240, 240)'};
  background-color: ${(props) =>
    props.isRead ? 'rgb(246, 184, 85)' : 'rgb(240, 240, 240)'};

  @media ${devices.tablet} {
    border-right: 1px solid rgba(100, 100, 100, 0.2);
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 7px;
`;

const Name = styled.div`
  font-size: 0.9rem;
`;

const LastMessage = styled.div`
  font-size: 0.78rem;
  font-style: italic;
  color: rgb(100, 100, 100);
`;

const Picture = styled.img`
  height: 90%;
  border-radius: 50%;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
  margin-left: 10px;
`;

const ListUser = (props) => {
  const { chat, index, isActive, handleClick, userId } = props;

  const checkIfRead = () => {
    const [lastMessageObject] = chat.messages.slice(-1);
    const lastMessageSender = lastMessageObject.sender;
    if (lastMessageSender === userId) return false;
    return chat.isRead;
  };

  const processLastMessage = (chat) => {
    const [lastMessageObject] = chat.messages.slice(-1);
    const lastMessage = lastMessageObject.message;
    const trimmedMessage =
      lastMessage.slice(0, 23) + (lastMessage.length > 30 ? '...' : '');
    return trimmedMessage;
  };

  return (
    <Wrapper
      isActive={isActive}
      isRead={checkIfRead()}
      onClick={() => handleClick(index)}
    >
      <Picture src={chat.picture} alt={`${chat.targetUserName} "picture"`} />
      <TextContainer>
        {/* <Name>{chat.targetUserName}</Name>
        <LastMessage>{processLastMessage(chat)}</LastMessage> */}
        <Name>9IB0W6CV6A0EwV7vTYW7</Name>
        <LastMessage>9IB0W6CV6A0EwV7vTYW7aaa...</LastMessage>
      </TextContainer>
    </Wrapper>
  );
};

export default ListUser;
