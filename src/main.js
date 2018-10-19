import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import VueChatScroll from "vue-chat-scroll";

Vue.use(VueChatScroll);

Vue.config.productionTip = false


// wait for firebase auth to init before creating the app instance
let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


