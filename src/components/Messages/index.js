import styled from 'styled-components/macro';
import Chat from './Chat';
import List from './List';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Messages = (props) => {
  console.log(props.location.targetUser);
  return (
    <Wrapper>
      <List />
      <Chat />
    </Wrapper>
  );
};

export default Messages;
