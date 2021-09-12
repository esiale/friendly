import { getAuth, signOut } from 'firebase/auth';

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
  return <button onClick={() => signOutUser()}>Sign OUT</button>;
};

export default Home;
