import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: 'index',
    path: '/:path(.*)+',
    redirect: {
      name: 'user',
    },
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('./view/user'),
    meta: {
      title: '社員一覧',
    },
  },
  {
    name: 'userInfo',
    path: '/user/info',
    component: () => import('./view/user/info'),
    meta: {
      title: '社員详细信息',
    },
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
