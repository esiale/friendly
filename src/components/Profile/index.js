import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components/macro';
import AuthenticatedLoader from '../common/AuthenticatedLoader';
import database from '../../config/firebase.config';

const Wrapper = styled.div`
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  color: rgba(0, 0, 0, 0.8);
  gap: 10px;
`;

const ProfilePicture = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgb(0, 0, 0, 0.6);
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
  width: 100%;
  overflow-wrap: anywhere;
  line-height: 1.4;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0px 0.5px 2px rgb(0, 0, 0, 0.1);
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
  const userId = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(database, 'users', userId.userId);
      const snapshot = await getDoc(docRef);
      setUserData(snapshot.data());
      setIsLoading(false);
    };
    getUserData();
  }, [userId]);

  if (isLoading) return <AuthenticatedLoader />;

  return (
    <>
      <Wrapper>
        <ProfilePicture src={userData.picture} />
        <Name>
          {userData.firstName} {userData.lastName}
        </Name>
        <Location>lcCnWNUqe51w0o3S2MDt</Location>
        <StyledLink
          to={{
            pathname: '/messages',
            targetUser: userId,
          }}
        >
          Send message
        </StyledLink>
        <About>
          lxoqtsnzrizelaofdbctvgustlllxymuwwyqblgmmgttgnuaozdgfvynqcovpxyrgbflhclghmiqjgfsscxscisontkwshwetgbgglxabnrcvwuivrchpelwpurkpbgybnwkdfgnpikjplboaoaokrkofrrcretzqkbsfktrsyxqlvjztgyujndmxtedqbpfcdspmkhihpbutxpvuzgfoqxradmbaxmhkzlhygfppruoaprrayzpgsjzlmzpiyyjvcmmllvzbfuesofbuuszbdxhlxhrrhkhklyqcexephrmmiazqaixvouftuphugnrpqpfxsczgppisreqtlzyrdptazkagfnhybmpryilcrblknhrvtlqrugxdywrhchivfaifpmchwcrtpccciddhiyizfybnwspltlxahomkdutohdjqeuxtouhfwodfuvakbpzertnldhvljqtiotaiaxgukwgfbnoajhbhccvrhuhrevgpfuedjgvhwtupaebsksggloehyoonlvajkdhnlpdgwgneemojaemjcnhmcuomxowgyubpvnhjudpvhjvpqdmgybammtrpmuervpxqvzg
        </About>
      </Wrapper>
    </>
  );
};

export default Profile;
