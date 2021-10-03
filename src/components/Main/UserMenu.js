import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  transform: ${({ userMenuIsVisible }) =>
    userMenuIsVisible ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  width: 150px;
  position: fixed;
  top: 50px;
  right: 0;
  background-color: rgb(var(--tertiary));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0 30px;
`;

const Option = styled.div`
  padding: 5px;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 1);
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const UserMenu = (props) => {
  const { userMenuIsVisible, userId, signOutUser, setUserMenuIsVisible } =
    props;
  return (
    <Wrapper userMenuIsVisible={userMenuIsVisible}>
      <StyledLink to={`/profile/${userId}`}>
        <Option onClick={() => setUserMenuIsVisible(false)}>
          View Profile
        </Option>
      </StyledLink>
      <Option onClick={() => signOutUser()}>Sign Out</Option>
    </Wrapper>
  );
};

export default UserMenu;
