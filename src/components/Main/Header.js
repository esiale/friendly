import { Link } from 'react-router-dom';
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

  @media (max-width: 425px) {
    justify-content: flex-end;
  }
`;

const Logo = styled.p`
  font-weight: 600;
  font-size: 2rem;
  margin: 10px 0px;
  color: #fff;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);

  @media (max-width: 425px) {
    display: none;
  }
`;

const LogoSpan = styled.span`
  color: rgba(243, 156, 18, 1);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.9);
`;

const UserPanel = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 5px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 1);
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 15px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
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
  @media (max-width: 960px) {
    display: none;
  }
`;

const Header = (props) => {
  const { firstName, picture, uid } = props.userData;
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
        <Picture src={picture} />
        <Name>{firstName}</Name>
      </UserPanel>
    </Wrapper>
  );
};

export default Header;
