import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import onlineIcon from '../../images/circleOnline.png';
import offlineIcon from '../../images/circleOffline.png';
import database from '../../config/firebase.config';
import formatDistance from 'date-fns/formatDistance';
import styled from 'styled-components/macro';
import Spinner from '../common/Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 150px;
  height: 225px;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgb(246, 246, 246);
  box-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.1);
  transition: background-color 200ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

const Paragraph = styled.p`
  width: 100%;
  font-size: 0.9rem;
  margin: 0 7px;
`;

const Name = styled(Paragraph)``;

const Location = styled(Paragraph)`
  font-size: 0.8rem;
`;

const Picture = styled.img`
  width: 100%;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const StatusPanel = styled.div`
  width: 100%;
  font-size: 0.8rem;
  display: flex;
  gap: 3px;
  margin: 5px 0px 0 7px;
`;

const LastSeen = styled.span`
  font-size: 0.75rem;
`;

const Card = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(null);
  const [lastSeen, setLastSeen] = useState(null);
  const [userData, setUserData] = useState({
    firstName: null,
    lastName: null,
    location: null,
    picture: null,
  });

  const { userId } = props;

  useEffect(() => {
    const getOnlineStatus = (userId) => {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (!data.connections) {
          setIsOnline(false);
          setLastSeen(processTimestamp(data.lastSeen));
        } else {
          setIsOnline(true);
        }
      });
    };
    getOnlineStatus(userId);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    const getUserData = async (userId) => {
      try {
        const docRef = doc(database, 'users', userId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          location: data.location,
          picture: data.picture,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData(userId);
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
            <LastSeen>Last seen: {lastSeen}</LastSeen>
          </>
        )}
      </StatusPanel>
    </Wrapper>
  );
};

export default Card;
