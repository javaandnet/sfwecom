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
    name: 'goods',
    path: '/goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情',
    },
  },
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
