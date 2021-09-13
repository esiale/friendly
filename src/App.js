import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import GlobalStyle from './theme/globalStyles';
import LoginLoader from './components/common/LoginLoader';
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

  useEffect(() => {
    const checkLoginStatus = async () => {
      const auth = getAuth();
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    };
    checkLoginStatus();
  }, []);

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
                <SignUpForm />
              </Login>
            </PublicRoute>
            <PrivateRoute path="/" isLoggedIn={isLoggedIn}>
              <Main>
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
