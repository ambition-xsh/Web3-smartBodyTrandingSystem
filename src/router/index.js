import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import vuex from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      hideNB: true
    }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach(async (to, from, next) => {
  const title = to.meta && to.meta.title;
  if(title){
    vuex.commit('set_navBarTitle', title);
  } else {
    vuex.commit('set_navBarTitle', '');
  }
  next();
});

export default router
