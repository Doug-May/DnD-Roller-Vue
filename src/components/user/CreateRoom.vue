<template>
    <div>
    <v-form ref="form" lazy-validation class="loginBox myCard">
        <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
      <h1 class="darkText text-xs-center">Create Room</h1>
    <v-text-field
      @keyup.enter="createRoom"
      v-if="$store.state.errors.email"   
      v-model="roomName"
      label="Room Name"
      color="#a04b4b"
      outline
      required
      :rules="[() => $store.state.errors.email]"
      error
    ></v-text-field>
    <v-text-field
      @keyup.enter="createRoom"
      v-else
      v-model="roomName"
      outline
      color="secondary"
      label="Room Name"
      required
    ></v-text-field>
    <v-text-field
      @keyup.enter="createRoom"
      v-if="$store.state.errors.email"   
      v-model="password"
      label="Password"
      color="#a04b4b"
      outline
      required
      :rules="[() => $store.state.errors.email]"
      error
    ></v-text-field>
    <v-text-field
      @keyup.enter="createRoom"
      v-else
      v-model="password"
      outline
      color="secondary"
      label="Password"
      required
    ></v-text-field>
    <v-btn
      block
      round
      id="submitButton"
      color="secondary"
      @click="createRoom"
    >
    Create
    </v-btn>
  </v-form>
  </div>
</template>

<script>
import firebase from "@/firebase/init.js"
export default {
    data() {
        return {
            roomName: '',
            password: ''
        }
    },
    methods: {
        createRoom() {
            //TODO check if room already exists
            let ref = firebase.firestore().collection("rooms").doc(this.roomName.trim())
            ref.get()
            .then(doc => {
                if (doc.exists) {
                    alert("That Room Already Exists. Please use a unique room name");
                } else {
                    let newRoom = {};
                    newRoom.password = this.password.trim();
                    newRoom.owner = this.$store.state.uid;
                    ref.set(newRoom)
                    .then(() => {
                        this.$store.dispatch("refreshUser");
                        alert("success");
                        this.$router.go(-1);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
            
        }
    }
}
</script>

<style scoped>

</style>


