import { Route, Switch } from 'react-router-dom';
import routes from './routes';

const ProtectedRoutes = () => (
  <Switch>
    {routes.map(({ component: Component, path, exact }) => (
      <Route path={`/${path}`} key={path} exact={exact}>
        <Component />
      </Route>
    ))}
  </Switch>
);

export default ProtectedRoutes;
