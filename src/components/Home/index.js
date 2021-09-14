import { getAuth, signOut } from 'firebase/auth';
import styled from 'styled-components/macro';
import Card from './Card';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const Home = () => {
  const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('signed out!');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      {/* <button onClick={() => signOutUser()}>Sign OUT</button> */}
      <Card userId={'DT8KfVBY02dA1iwSsPBTtPCrphh1'} />
      <Card userId={'JiHIIi63a1fdrAafhRL1R3M8iCs2'} />
    </Wrapper>
  );
};

export default Home;
