import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('../components/Home')),
    exact: true,
  },
];

export default routes;
