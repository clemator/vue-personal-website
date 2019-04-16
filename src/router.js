import UserLayout from './layouts/UserLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import NotFoundLayout from './layouts/NotFoundLayout';

import TheLoginForm from './components/TheLoginForm';
import TheLoginForm from './components/TheLoginForm';

import store from './store';

/**
 * The route configuration array
 */
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
        name: 'test'
      }
    ]
  },
  {
    path: '/shape-it',
    component: ShapeItLayout,
    name: 'shape-it',
    meta: { requiresAuth: false },
    children: [
      path: 'surface',
      component: 
    ]
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: NotFoundLayout
  }
];

/**
 * Global before guard
 *  - one of it's purpose is to redirect to 404 if requested route does not exists
 *  - another is to redirect if not authenticated and requesting authentication required route
 *    - the authentication flag from authentication store is used
 * @param {Object} to - the route transitioning to
 * @param {Object} from - the route transitioning from
 * @param {Function} next - the function to call to resolve the hook
 */
export function globalBeforeGuard(to, from, next) {
  if (to.matched.length === 0)
    next('not-found');
  else if (to.matched.some(record => record.meta.requiresAuth)) {
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
