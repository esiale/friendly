import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getDatabase,
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
import GlobalStyle from './global/globalStyles';
import LoginLoader from './components/common/LoginLoader';
import AuthenticatedLoader from './components/common/AuthenticatedLoader';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import database from './config/firebase.config';

const Login = lazy(() => import('./components/Login'));
const Main = lazy(() => import('./components/Main/'));
const SignInForm = lazy(() => import('./components/Login/SignInForm'));
const SignUpForm = lazy(() => import('./components/Login/SignUpForm'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const userId = useRef(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          userId.current = user.uid;
          const realTimeDb = getDatabase();
          const connectedRef = ref(realTimeDb, '.info/connected');
          const lastSeenRef = ref(realTimeDb, `users/${user.uid}/lastSeen`);
          const connectionsRef = ref(
            realTimeDb,
            `users/${user.uid}/connections`
          );
          onValue(connectedRef, async (snap) => {
            if (snap.val() === true) {
              const connection = push(connectionsRef);
              onDisconnect(connection).remove();
              set(connection, true);
              onDisconnect(lastSeenRef).set(serverTimestamp());
            }
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    };
    checkLoginStatus();
  }, []);

  if (isCreatingNewUser)
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
        <Suspense fallback={<LoginLoader />}>
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
            <PrivateRoute path="/" isLoggedIn={isLoggedIn}>
              <Main userId={userId.current}>
                <ProtectedRoutes />
              </Main>
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
