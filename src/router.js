import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import About from '@/views/About.vue'
import Add from '@/views/Add.vue'
import Edit from '@/views/Edit.vue'
import Profile from '@/views/Profile.vue'
import CreateRoom from '@/views/CreateRoom.vue'
import EditUserName from '@/views/EditUserName.vue'
import ResetPassword from '@/views/ResetPassword'
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
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createroom',
      name: 'createroom',
      component: CreateRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editusername',
      name: 'editusername',
      component: EditUserName,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:slug',
      name: 'edit',
      component: Edit,
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
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword,
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
  //clear the errors object in the state
  store.commit("CLEAR_ERRORS");
  //check if route requires auth and then redundancy
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (store.state.uid) {
      next();
    } else {
      next('/login');
    }
  } else if (to.matched.some(rec => rec.meta.redundantRoute)) {
    if(store.state.uid) {
      next('/')
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router