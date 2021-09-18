import Home from '../components/Home';
import Messages from '../components/Messages';
import Profile from '../components/Profile';

const routes = [
  {
    path: '',
    component: Home,
    exact: true,
  },
  {
    path: 'messages',
    component: Messages,
    exact: true,
  },
  {
    path: 'profile/:userId',
    component: Profile,
    exact: true,
  },
];

export default routes;
