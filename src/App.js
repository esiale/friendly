import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
  goOnline,
} from 'firebase/database';
import GlobalStyle from './global/globalStyles';
import AuthenticatedLoader from './components/common/AuthenticatedLoader';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import database from './config/firebase.config';
import Login from './components/Login';
import Main from './components/Main';
import SignInForm from './components/Login/SignInForm';
import SignUpForm from './components/Login/SignUpForm';

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const userId = useRef(null);

  useEffect(() => {
    const realTimeDb = getDatabase();

    const checkLoginStatus = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          userId.current = user.uid;
          const connectedRef = ref(realTimeDb, '.info/connected');
          const lastSeenRef = ref(realTimeDb, `users/${user.uid}/lastSeen`);
          const onlineStatusRef = ref(realTimeDb, `users/${user.uid}/online`);
          onValue(connectedRef, async (snap) => {
            if (snap.val() === true) {
              onDisconnect(onlineStatusRef).set(false);
              onDisconnect(lastSeenRef).set(serverTimestamp());
              await set(onlineStatusRef, true);
            }
          });
          setIsLoggedIn(true);
          setIsAuthenticating(false);
        } else {
          setIsLoggedIn(false);
          setIsAuthenticating(false);
        }
      });
    };
    checkLoginStatus();
  }, []);

  if (isCreatingNewUser || isAuthenticating)
    return (
      <>
        <GlobalStyle />
        <AuthenticatedLoader />
      </>
    );

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <PublicRoute path="/login" isLoggedIn={isLoggedIn}>
            <Login>
              <SignInForm />
            </Login>
          </PublicRoute>
          <PublicRoute path="/register" isLoggedIn={isLoggedIn}>
            <Login>
              <SignUpForm setIsCreatingNewUser={setIsCreatingNewUser} />
            </Login>
          </PublicRoute>
          <PrivateRoute
            path="/"
            isLoggedIn={isLoggedIn}
            userId={userId.current}
          >
            <Main>
              <ProtectedRoutes />
            </Main>
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
};

export default App;
