import styled from 'styled-components/macro';

const Wrapper = styled.div`
  grid-area: header;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = (props) => {
  return (
    <Wrapper>
      {props.targetUserId
        ? `Chatting with: '${props.targetUserId}`
        : `Pick someone to chat with!`}
    </Wrapper>
  );
};

export default Header;
