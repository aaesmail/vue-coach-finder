import { createRouter, createWebHistory } from 'vue-router';

import store from './store/index';
import Coaches from './pages/coaches/Coaches.vue';
import CoachesList from './pages/coaches/CoachesList.vue';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/coaches/ContactCoach.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },

    {
      path: '/coaches',
      component: Coaches,
      children: [
        { path: '', component: CoachesList },
        {
          path: 'register',
          component: CoachRegistration,
          meta: { requiresAuth: true },
        },
        {
          path: ':id',
          component: CoachDetail,
          props: true,
          children: [{ path: 'contact', component: ContactCoach, props: true }],
        },
      ],
    },

    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },

    {
      path: '/login',
      component: UserAuth,
      name: 'login',
      meta: { requiresUnauth: true },
    },

    {
      path: '/signup',
      component: UserAuth,
      name: 'signup',
      meta: { requiresUnauth: true },
    },

    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
