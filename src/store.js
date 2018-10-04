import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router.js'
import firebase from '@/firebase/init.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    email: '',
    errors: {}
  },
  mutations: {
    LOGIN(state, payload) {
      state.isLoggedIn = true;
      router.push("/rolls");
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      router.push("/login");
    },
    CHECK_PERSISTED(state, user) {
      state.isLoggedIn = true;
      state.email = user.email;
      router.push("/");      
    }
  },
  actions: {
    login({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {        
        commit("LOGIN", response.data);
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
    checkPersisted({ commit }) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {          
          commit("CHECK_PERSISTED", user);
        }
      });
    }
  }
})
