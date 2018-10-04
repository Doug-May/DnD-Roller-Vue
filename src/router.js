import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import About from '@/views/About.vue'
import Rolls from '@/views/Rolls.vue'
import store from '@/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rolls',
      name: 'rolls',
      component: Rolls,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redundantRoute: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        redundantRoute: true
      }
    }    
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
})

router.beforeEach((to, from, next) => {
  //check if route requires auth and then redundancy
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (store.state.isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else if (to.matched.some(rec => rec.meta.redundantRoute)) {
    if(store.state.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router