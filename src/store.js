import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router.js'
import firebase from '@/firebase/init.js'
import moment from "moment"
const audio = new Audio(require('@/assets/addRoll.mp3'));
import swal from "sweetalert2";

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
    playSound: false,
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
      state.inRoom = false;
      state.roomID = '',
      state.playSound = false;
      state.errors = {};
      router.push("/login");
    },
    JOIN_ROOM(state, payload) {
      state.inRoom = true;
      state.roomID = payload.id;
    },
    LEAVE_ROOM(state) {
      swal({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        title: 'Left "' + state.roomID + '"',
        customClass: "alert"
        }); 
      state.inRoom = false;
      state.roomID = "";
      state.messages = [];
    },
    UPDATE_MESSAGES(state, payload) {
      payload.timestamp = moment(payload.timestamp).format('lll');
      state.messages.push(payload);
      if(state.playSound) {
        audio.play();
      } 
    },
    CLEAR_MESSAGES(state) {
      state.messages = [];
    },
    SET_ERRORS(state, payload) {
      state.errors = {...state.errors, ...payload};
    },
    CLEAR_ERRORS(state) {
      state.errors = {};
    },
    CLEAR_ONE_ERROR(state, payload) {
      delete state.errors[payload.key];
    }
  },
  actions: {
    login({ dispatch, commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch("refreshUser");
        swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          title: "Logged In",
          customClass: "alert"
        });
        router.push("/");
      })
      .catch(error => {
        let payload = {};
        if (error.code == "auth/invalid-email") {
          payload.email = "Invalid Email";
        }
        if (error.code == "auth/user-not-found") {
          payload.email = "User Not Found";
        }
        if (error.code == "auth/wrong-password") {
          payload.password = "Incorrect Password";
        }
        commit("SET_ERRORS", payload);
      })
    },
    register({ dispatch, commit }, payload) {
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
          swal({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "Registered!",
            customClass: "alert"
          });
          router.push("/");
        })        
        .catch(error => {
          console.log(error);
        })        
      })
      .catch(error => {
        let payload = {};
          if (error.code == "auth/email-already-in-use") {
            payload.email = "Email Is Already In Use";
          }
          if (error.code == "auth/invalid-email") {
            payload.email = "Invalid Email";
          }
          if (error.code == "auth/weak-password") {
            payload.password = "Password Not Strong Enough";
          }
          commit("SET_ERRORS", payload);
      })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      .then(() => {
        swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          title: "Logged Out",
          customClass: "alert"
        });        
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
    }
  }
})
