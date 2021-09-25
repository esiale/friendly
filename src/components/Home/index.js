import { useEffect, useState } from 'react/cjs/react.development';
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

const Home = (props) => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = props;
  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const q = query(usersRef, limitToFirst(21), orderByChild('online'));
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
  }, [userId]);

  if (isLoading)
    return (
      <Loader>
        <Spinner />
      </Loader>
    );

  return (
    <Wrapper>
      {users.map((user) => (
        <StyledLink to={`/profile/${user}`} key={uniqid()}>
          <Card userId={user} />
        </StyledLink>
      ))}
      {users.map((user) => (
        <Card userId={user} key={uniqid()} />
      ))}
    </Wrapper>
  );
};

export default Home;
