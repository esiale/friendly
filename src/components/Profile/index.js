import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import devices from '../../global/devices';
import styled from 'styled-components/macro';
import AuthenticatedLoader from '../common/AuthenticatedLoader';
import database from '../../config/firebase.config';

const Wrapper = styled.div`
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 10px;
  color: rgba(0, 0, 0, 0.8);
  gap: 10px;

  @media ${devices.tablet} {
    margin-top: 50px;
    max-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 'picture info' 'about about';
  }
`;

const BasicInfoWrapper = styled.div`
  grid-area: info;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media ${devices.tablet} {
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const ProfilePicture = styled.img`
  grid-area: picture;
  width: 300px;
  height: 300px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.6);

  @media ${devices.tablet} {
    justify-self: end;
  }
`;

const Name = styled.div`
  font-size: 1.1rem;
  align-self: flex-start;
  text-align: left;
  line-height: 1.3;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 3px 5px;
  box-shadow: 0px 0.5px 2px rgb(0, 0, 0, 0.1);
`;

const Location = styled.div`
  align-self: flex-start;
  background-color: rgba(0, 0, 0, 0.03);
  font-size: 0.9rem;
  padding: 5px 7px;
  border-radius: 5px;
  box-shadow: 0px 0.5px 2px rgb(0, 0, 0, 0.1);
`;

const About = styled.div`
  align-self: flex-start;
  grid-area: about;
  overflow-wrap: anywhere;
  line-height: 1.4;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0px 0.5px 2px rgb(0, 0, 0, 0.1);

  @media ${devices.tablet} {
    align-self: start;
    width: fit-content;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
  margin: 5px 0;
  border-radius: 10px;
  background-color: rgba(var(--tertiary));
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.3);
`;

const Profile = (match) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const targetUserId = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(database, 'users', targetUserId.targetUserId);
      const snapshot = await getDoc(docRef);
      setUserData(snapshot.data());
      setIsLoading(false);
    };
    getUserData();
  }, [targetUserId]);

  if (isLoading) return <AuthenticatedLoader />;

  return (
    <>
      <Wrapper>
        <ProfilePicture src={userData.picture} />
        <BasicInfoWrapper>
          <Name>
            {userData.firstName} {userData.lastName}
          </Name>
          {userData.location !== '' ? (
            <Location>{userData.location}</Location>
          ) : null}
          {match.userId === targetUserId.targetUserId ? null : (
            <StyledLink
              to={{
                pathname: '/messages',
                targetUser: targetUserId.targetUserId,
              }}
            >
              Send message
            </StyledLink>
          )}
        </BasicInfoWrapper>
        {userData.about !== '' ? <About>{userData.about}</About> : null}
      </Wrapper>
    </>
  );
};

export default Profile;
