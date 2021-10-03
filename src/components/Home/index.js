import { useEffect, useState } from 'react';
import {
  getDatabase,
  ref,
  query,
  limitToFirst,
  orderByChild,
  get,
  off,
} from 'firebase/database';
import { Link } from 'react-router-dom';
import reload from '../../images/reload.svg';
import Spinner from '../common/Spinner';
import devices from '../../global/devices';
import uniqid from 'uniqid';
import styled from 'styled-components/macro';
import Card from './Card';

const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 150px;
  height: 235px;

  @media ${devices.mobileL} {
    width: 200px;
    height: 300px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  justify-items: center;
  row-gap: 15px;
  margin-top: 25px;
  padding-bottom: 25px;

  @media ${devices.mobileL} {
    row-gap: 25px;
  }

  @media ${devices.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${devices.laptopL} {
    grid-template-columns: repeat(5, 1fr);
    width: 80%;
  }

  @media ${devices.desktop} {
    width: 60%;
  }

  @media ${devices.desktopL} {
    width: 50%;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border: 0;
  border-radius: 20px;
  background-color: rgba(var(--primary), 1);
  margin: 15px 0 10px 0;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  transition: all 300ms;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: rgb(245, 174, 61);
    transform: scale(1.05);
    outline: 0;
  }
`;

const Reload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    transition: all 500ms;
    cursor: pointer;

    &:hover {
      transform: rotate(180deg) translate(10px, 3px);
    }
  }
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = (props) => {
  const [users, setUsers] = useState(null);
  const [showUsers, setShowUsers] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = props;

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const q = query(usersRef, limitToFirst(99), orderByChild('online'));
    const getUsers = async () => {
      try {
        const snapshot = await get(q);
        const users = snapshot.val();
        const usersArray = Object.entries(users).map((entry) => ({
          [entry[0]]: entry[1],
        }));
        const onlineUsers = usersArray.filter((user) => {
          return !!Object.values(user)[0].online;
        });
        const offlineUsers = usersArray.filter((user) => {
          return !Object.values(user)[0].online;
        });
        const sortedOfflineUsers = offlineUsers.sort((a, b) => {
          const aDate = new Date(parseInt(Object.values(a)[0].lastSeen));
          const bDate = new Date(parseInt(Object.values(b)[0].lastSeen));
          if (aDate < bDate) return 1;
          if (aDate > bDate) return -1;
          return 0;
        });
        const sortedUsers = [...onlineUsers, ...sortedOfflineUsers];
        const uids = Object.keys(Object.assign({}, ...sortedUsers));
        const uidsWithoutCurrent = uids.filter((user) => user !== userId);
        setUsers(uidsWithoutCurrent);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => off(usersRef);
  }, [userId, isLoading]);

  const handleShowMore = (e) => {
    e.currentTarget.blur();
    setShowUsers((prev) => prev + 10);
  };

  if (isLoading)
    return (
      <Loader>
        <Spinner />
      </Loader>
    );

  return (
    <Wrapper>
      <Reload
        onClick={() => {
          setIsLoading(true);
        }}
      >
        <img src={reload} alt="Reload icon" />
      </Reload>
      {users.slice(0, showUsers).map((user) => (
        <StyledLink to={`/profile/${user}`} key={uniqid()}>
          <Card userId={user} />
        </StyledLink>
      ))}
      <LoadMore>
        {showUsers >= users.length ? null : (
          <Button onClick={(e) => handleShowMore(e)}>Show more</Button>
        )}
      </LoadMore>
    </Wrapper>
  );
};

export default Home;
