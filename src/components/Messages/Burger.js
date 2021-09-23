import { useState } from 'react';
import devices from '../../global/devices';
import styled from 'styled-components/macro';

const StyledBurger = styled.div`
  width: 32px;
  height: 32px;
  position: fixed;
  top: 10px;
  left: 14px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  z-index: 1;

  @media ${devices.tablet} {
    display: none;
  }

  div {
    width: 32px;
    height: 4px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    background-color: ${({ listVisible }) =>
      listVisible ? 'rgb(246, 184, 85)' : 'rgb(255, 255, 255)'};

    &:nth-child(1) {
      transform: ${({ listVisible }) =>
        listVisible ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      transform: ${({ listVisible }) =>
        listVisible ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${({ listVisible }) => (listVisible ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ listVisible }) =>
        listVisible ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = (props) => {
  const { listVisible, toggleListVisible } = props;

  return (
    <StyledBurger listVisible={listVisible} onClick={() => toggleListVisible()}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
