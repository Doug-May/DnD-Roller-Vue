<template>
    <div>
    <v-form ref="form" lazy-validation class="loginBox myCard">
        <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
      <h2 class="darkText text-xs-center">Create Room</h2>
    <v-text-field
      @keyup.enter="createRoom"
      v-if="$store.state.errors.roomName"   
      v-model="roomName"
      label="Room Name"
      color="#a04b4b"
      outline
      required
      :rules="[() => $store.state.errors.roomName]"
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
      v-if="$store.state.errors.password"   
      v-model="password"
      label="Password"
      color="#a04b4b"
      outline
      required
      :rules="[() => $store.state.errors.password]"
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
import firebase from "@/firebase/init.js";
import Validate from "@/validation/createRoom.js";
import swal from "sweetalert2";
export default {
    data() {
        return {
            roomName: '',
            password: ''
        }
    },
    methods: {
        createRoom() {
            this.$store.commit("CLEAR_ERRORS");
            let data = {};
            data.roomName = this.roomName.trim();
            data.password = this.password.trim();
            const {errors, isValid} = Validate(data);
            if(!isValid) {
                this.$store.commit("SET_ERRORS", errors);
            } else {
                let ref = firebase.firestore().collection("rooms").doc(this.roomName.trim())
                ref.get()
                .then(doc => {
                    if (doc.exists) {
                        this.$store.commit("SET_ERRORS", {roomName: "That room already exists!"});
                    } else {
                        let newRoom = {};
                        newRoom.password = this.password.trim();
                        newRoom.owner = this.$store.state.uid;
                        ref.set(newRoom)
                        .then(() => {
                            this.$store.dispatch("refreshUser");
                            swal({
                            toast: true,
                            position: "bottom-end",
                            showConfirmButton: false,
                            timer: 3000,
                            type: "success",
                            title: "Room Created",
                            customClass: "alert"
                            });  
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
}
</script>

<style scoped>

</style>


