import UserLayout from './layouts/UserLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import NotFoundLayout from './layouts/NotFoundLayout';

import TheLoginForm from './components/TheLoginForm';

import store from './store';

export const routes = [
  {
    path: '/',
    component: AnonymousLayout,
    name: 'root',
    meta: { requiresAuth: false },
    children: [
      {
        path: 'login',
        component: TheLoginForm,
        name: 'login'
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    name: 'user',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'test',
        name: 'test',
        children: [
          {
            path: '*',
            redirect: { name: 'not-found' }
          }
        ]
      },
      {
        path: '*',
        redirect: { name: 'not-found' }
      }
    ]
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFoundLayout,
    children: [
      {
        path: '*',
        redirect: { name: 'not-found' }
      }
    ]
  }
];

export function globalBeforeGuard(to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isUserAuthenticated = store.getters['authentication/isAuthenticated'];

    if (!isUserAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
    else
      next();
  }
  else
    next();
}
