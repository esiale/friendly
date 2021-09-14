import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import database from '../../config/firebase.config';
import devices from '../../global/devices';
import styled from 'styled-components/macro';
import homeIcon from '../../images/home.png';
import chatIcon from '../../images/chat.png';

const Wrapper = styled.header`
  width: 100%;
  height: 50px;
  background-color: rgb(var(--tertiary));
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
`;

const Logo = styled.p`
  width: calc(100% / 3);
  font-weight: 600;
  font-size: 2rem;
  margin: 10px 0px;
  color: #fff;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);
  visibility: hidden;

  @media ${devices.mobileL} {
    visibility: visible;
  }
`;

const LogoSpan = styled.span`
  color: rgba(243, 156, 18, 1);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);
`;

const UserPanel = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 1);
`;

const Navigation = styled.div`
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const Picture = styled.img`
  height: 90%;
  border-radius: 50%;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
`;

const Icon = styled.img`
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.3));
  border-radius: 5px;
  transition: background-color 200ms;
  &:hover,
  &:focus {
    background-color: rgb(var(--secondary));
  }
`;

const Name = styled.p`
  display: none;

  @media ${devices.mobileM} {
    display: inline;
  }
`;

const Header = (props) => {
  const { userId } = props;
  const [currentUserData, setCurrentUserData] = useState({
    firstName: null,
    picture: null,
  });

  useEffect(() => {
    const getCurrentUserData = async (userId) => {
      try {
        const docRef = doc(database, 'users', userId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setCurrentUserData({
          firstName: data.firstName,
          picture: data.picture,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUserData(userId);
  }, [userId]);

  return (
    <Wrapper>
      <Logo>
        Friend<LogoSpan>ly</LogoSpan>
      </Logo>
      <Navigation>
        <Link to={'/home'}>
          <Icon src={homeIcon} />
        </Link>
        <Link to={'/messages'}>
          <Icon src={chatIcon} />
        </Link>
      </Navigation>
      <UserPanel>
        <Picture src={currentUserData.picture} />
        <Name>{currentUserData.firstName}</Name>
      </UserPanel>
    </Wrapper>
  );
};

export default Header;
