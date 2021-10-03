import styled from 'styled-components/macro';
import devices from '../../global/devices';

const Wrapper = styled.div`
  width: fit-content;
  word-break: break-word;
  padding: 7px 12px;
  margin: 4px 10px;
  border-radius: 15px;
  align-self: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.9);
  background-color: ${(props) =>
    props.isSender ? 'rgb(255, 224, 179)' : 'rgb(230, 230, 230)'};

  @media ${devices.tablet} {
    margin: 4px 30px;
  }
`;

function Message(props) {
  const { message, userId } = props;

  const checkIfUserIsSender = () => {
    return message.sender === userId;
  };

  return <Wrapper isSender={checkIfUserIsSender()}>{message.message}</Wrapper>;
}

export default Message;
