import Home from '../components/Main/Home';
import Messages from '../components/Main/Messages';

const routes = [
  {
    path: 'home',
    component: Home,
    exact: true,
  },
  {
    path: 'messages',
    component: Messages,
    exact: true,
  },
];

export default routes;
