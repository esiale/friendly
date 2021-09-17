import { getDatabase, ref, onValue, off } from 'firebase/database';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import onlineIcon from '../../images/circleOnline.png';
import offlineIcon from '../../images/circleOffline.png';
import database from '../../config/firebase.config';
import formatDistance from 'date-fns/formatDistance';
import styled from 'styled-components/macro';
import Spinner from '../common/Spinner';
import devices from '../../global/devices';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  height: 235px;
  padding-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgb(246, 246, 246);
  box-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.1);
  transition: background-color 200ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: rgb(235, 235, 235);
  }

  @media ${devices.mobileL} {
    width: 200px;
    height: 300px;
  }
`;

const Paragraph = styled.p`
  width: 100%;
  font-size: 0.9rem;
  margin: 0 7px;

  @media ${devices.mobileL} {
    font-size: 1.1rem;
  }
`;

const Name = styled(Paragraph)`
  text-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.4);
  /* font-weight: 600; */
`;

const Location = styled(Paragraph)`
  font-size: 0.8rem;
  height: 12px;

  @media ${devices.mobileL} {
    font-size: 1rem;
    height: 16px;
  }
`;

const Picture = styled.img`
  width: 100%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const StatusPanel = styled.div`
  width: 100%;
  height: 35px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 5px 0 0 5px;

  @media ${devices.mobileL} {
    margin-top: 10px;
  }
`;

const LastSeen = styled.span`
  font-size: 0.75rem;

  @media ${devices.mobileL} {
    font-size: 0.9rem;
  }
`;

const Card = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(null);
  const [lastSeen, setLastSeen] = useState(null);
  const [userData, setUserData] = useState({
    firstName: null,
    location: null,
    picture: null,
  });

  const { userId } = props;

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const getOnlineStatus = (userId) => {
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (!data.online) {
          setIsOnline(false);
          setLastSeen(processTimestamp(data.lastSeen));
        } else {
          setIsOnline(true);
        }
      });
    };
    getOnlineStatus(userId);
    setIsLoading(false);
    return () => off(userRef);
  }, [userId]);

  useEffect(() => {
    const getUserData = async (userId) => {
      try {
        const docRef = doc(database, 'users', userId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setUserData({
          firstName: data.firstName,
          location: data.location,
          picture: data.picture,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData(userId);
    return () => setUserData({ ...userData });
  }, [userId]);

  const processTimestamp = (value) => {
    const date = new Date(parseInt(value));
    const currentDate = new Date();
    const distance = formatDistance(currentDate, date);
    return distance;
  };

  if (isLoading)
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Picture src={userData.picture} />
      <Name>{userData.firstName}</Name>
      <Location>{userData.location}</Location>
      <StatusPanel>
        {isOnline ? (
          <>
            <Icon src={onlineIcon} alt="online icon" />
            Online now!
          </>
        ) : (
          <>
            <Icon src={offlineIcon} alt="offline icon" />
            <LastSeen>Last seen {lastSeen} ago</LastSeen>
          </>
        )}
      </StatusPanel>
    </Wrapper>
  );
};

export default Card;
