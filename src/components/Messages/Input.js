import { useState, useRef } from 'react';
import styled from 'styled-components/macro';

const StyledForm = styled.form`
  grid-area: input;
  width: 100%;
`;

const TextInput = styled.input``;

const SendInput = styled.input``;

const StyledLabel = styled.label``;

const Counter = styled.div``;

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
      <Counter>Characters left: {message.length}/300</Counter>
      <SendInput type="submit" />
    </StyledForm>
  );
};

export default Input;
