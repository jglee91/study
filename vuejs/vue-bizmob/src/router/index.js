import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // common page routing...
  {
    path: '/error',
    name: 'error',
    component: () => import('@/view/error/ErrorView'),
    meta: {}
  },
  {
    path: '/*',
    name: 'Not Found',
    redirect: '/error'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

// FIXME
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  console.log(next);

  return next();
});

export default router;
