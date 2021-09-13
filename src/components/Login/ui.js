import styled from 'styled-components/macro';
import { Field, Form } from 'formik';

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
`;

const StyledField = styled(Field)`
  border: 0;
  border-bottom: 2px rgba(var(--primary), 0.8) solid;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 7px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  transition: transform 300ms;
  &:focus {
    outline: none;
    transform: scale(1.05);
  }
  &:-webkit-autofill {
    transition: background-color 600000s 0s, color 600000s 0s, transform 300ms !important;
  }
`;

const ErrorBox = styled.div`
  height: 0.9rem;
  margin: 5px 0 0 0;
`;

const Error = styled.p`
  margin: 0;
  color: rgb(204, 0, 0);
  font-size: 0.9rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 1);
  text-align: right;
`;

const Label = styled.label`
  margin: 10px 0;
`;

const Button = styled.button`
  border: 0;
  border-radius: 20px;
  background-color: rgba(var(--primary), 1);
  margin: 15px 0 10px 0;
  padding: 10px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  transition: all 300ms;

  &:hover,
  &:focus {
    background-color: rgb(245, 174, 61);
    transform: scale(1.05);
    outline: 0;
  }
`;

const Paragraph = styled.p`
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: center;
`;

export { StyledForm, StyledField, ErrorBox, Error, Label, Button, Paragraph };
