import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router.js'
import firebase from '@/firebase/init.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    uid: null,
    email: null,
    errors: {}
  },
  mutations: {
    LOGIN(state, user) {
      state.isLoggedIn = true;
      state.uid = user.uid;
      state.email = user.email;
      router.push("/");
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.uid = null;
      state.email = null;
      router.push("/login");
    }
  },
  actions: {
    login({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(cred => {        
        commit("LOGIN", cred.user);
      })
      .catch(error => {
        console.log(error);
      })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      .then(() => {        
        commit("LOGOUT");        
      })
      .catch(error => {
        console.log(error);
      });
    },
    persistedLogin({ commit }, user) {      
          commit("LOGIN", user);     
    }
  }
})
