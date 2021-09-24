import { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import sendIcon from '../../images/send.png';

const StyledForm = styled.form`
  grid-area: input;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TextInput = styled.input`
  width: 100%;
  border: 0;
  border-radius: 20px;
  background-color: rgb(230, 230, 230);
  padding: 10px;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  color: rgba(0, 0, 0, 0.9);
  border: 1px transparent solid;

  &:focus {
    border-radius: 20px;
    border: 1px rgb(var(--primary)) solid;
    outline: none;
  }
`;

const SendInput = styled.input`
  width: 35px;
  height: 35px;
`;

const StyledLabel = styled.label`
  width: 100%;
`;

const InputPanel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const Counter = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 5px;
`;

const Input = (props) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const { sendMessage, markAsRead, currentChat } = props;

  const handleChange = (e) => {
    e.keyCode === 13 ? handleSubmit() : setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    if (!validateMessage(message)) return;
    sendMessage(message);
    setMessage('');
  };

  const validateMessage = (message) => {
    return message && message.replace(/\s/g, '').length ? true : false;
  };

  return (
    <StyledForm autoComplete="off" noValidate onSubmit={(e) => handleSubmit(e)}>
      <InputPanel>
        <StyledLabel htmlFor="textinput">
          <TextInput
            type="text"
            id="textinput"
            value={message}
            placeholder="Type your message"
            maxLength="300"
            onChange={(e) => handleChange(e)}
            autoFocus
            ref={inputRef}
            onFocus={() => markAsRead(currentChat)}
          />
        </StyledLabel>
        <SendInput type="image" src={sendIcon} />
      </InputPanel>
      <Counter>Characters left: {message.length}/300</Counter>
    </StyledForm>
  );
};

export default Input;
