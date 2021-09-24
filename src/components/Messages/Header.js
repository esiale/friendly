import styled from 'styled-components/macro';

const Wrapper = styled.div`
  grid-area: header;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = (props) => {
  const { targetUserName } = props;

  return (
    <Wrapper>
      {targetUserName
        ? `Chatting with ${targetUserName}`
        : `Pick someone to chat with!`}
    </Wrapper>
  );
};

export default Header;
