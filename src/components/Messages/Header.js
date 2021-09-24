import styled from 'styled-components/macro';

const Wrapper = styled.div`
  grid-area: header;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.7);
`;

const Header = (props) => {
  const { currentChat, chats } = props;

  const getTargetUserName = () => {
    if (!chats[currentChat]) return null;
    return chats[currentChat].targetUserName;
  };

  return (
    <Wrapper>
      {getTargetUserName() ? `Chatting with ${getTargetUserName()}` : null}
    </Wrapper>
  );
};

export default Header;
