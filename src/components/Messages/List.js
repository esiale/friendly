import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import database from '../../config/firebase.config';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = (props) => {
  const { chats, userId } = props;
  console.log(chats);
  return <Wrapper></Wrapper>;
};

export default List;
