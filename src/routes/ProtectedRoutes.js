import { Route, Switch } from 'react-router-dom';
import routes from './routes';

const ProtectedRoutes = (props) => (
  <Switch>
    {routes.map(({ component: Component, path, exact }) => (
      <Route
        {...props}
        path={`/${path}`}
        key={path}
        exact={exact}
        render={(routerProps) => <Component {...routerProps} {...props} />}
      />
    ))}
  </Switch>
);

export default ProtectedRoutes;
