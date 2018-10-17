import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router.js'
import firebase from '@/firebase/init.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: null,
    uid: null,
    email: null,
    rolls: [],
    rooms: [],
    inRoom: false,
    roomID: '',
    messages: [],
    errors: {}
  },
  mutations: {
    REFRESH_USER(state, user) {
      state.uid = user.uid;
      state.email = user.email;
      state.userName = user.userName;
      state.rolls = user.rolls;
      state.rooms = user.rooms;
    },
    LOGOUT(state) {
      state.uid = null;
      state.email = null;
      state.userName = null;
      state.rolls = [];
      state.rooms = [];
      router.push("/login");
    },
    JOIN_ROOM(state, payload) {
      state.inRoom = true;
      state.roomID = payload.id;
    },
    UPDATE_MESSAGES(state, payload) {
      state.messages.push(payload);
    },
    SET_MESSAGES(state, payload) {
      payload.forEach(doc => {
        state.messages.push(doc.data());
      })
    }
  },
  actions: {
    login({ dispatch }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch("refreshUser");
        router.push("/");
      })
      .catch(error => {
        console.log(error);
      })
    },
    register({ dispatch }, payload) {
      //create the user in firebase authentication
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        //add the user to the users collection       
        let newUser = {};
        newUser.userName = payload.userName;
        newUser.id = firebase.auth().currentUser.uid;
        firebase.firestore().collection("users").add(newUser)
        .then(() => {
          dispatch("refreshUser");
          router.push("/");
        })        
        .catch(err => {
          console.log(err);
        })        
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
    refreshUser({ commit }) {
      let user = firebase.auth().currentUser;
        if (user) {
          let payload = {};
          payload.rolls = [];
          payload.rooms = [];
          payload.uid = user.uid;
          payload.email = user.email;

          // Call for getting userName
          firebase.firestore().collection("users").where("id", "==", user.uid).get()
          .then(snapshot => {
              snapshot.forEach(doc => {
                  payload.userName = doc.data().userName;
              })
              commit("REFRESH_USER", payload);
          })
          .catch(err => {
              console.log(err);
          })  
          
          // Call for getting rolls
          firebase.firestore().collection("rolls").where("id", "==", user.uid).get()
          .then(snapshot => {
              snapshot.forEach(doc => {
                  let roll = doc.data();
                  roll.id = doc.id;
                  payload.rolls.push(roll);
              });
              commit("REFRESH_USER", payload);                     
          })
          .catch(err => {
            console.log(err);
          })

          // Call for getting rooms
          firebase.firestore().collection("rooms").where("owner", "==", user.uid).get()
          .then(snapshot => {
              snapshot.forEach(doc => {         
                  let room = {};
                  room.password = doc.data().password;
                  room.docID = doc.id;
                  payload.rooms.push(room);
              });
              commit("REFRESH_USER", payload);
          })
        }                      
    },
    joinRoom({ commit }, payload) {
      commit("JOIN_ROOM", {id: payload.id});
      firebase.firestore().collection("messages").where("room", "==", payload.id).orderBy("timestamp").get()
      .then(snapshot => {
        commit("SET_MESSAGES", snapshot);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})
