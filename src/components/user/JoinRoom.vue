<template>
<div>
    <h2 class="text-xs-center darkText">Join a Room</h2>
    <v-layout row wrap justify-center align-center>
        <v-flex xs12 md6 class="flexWrapper">
            <div>
                <div id="joinRoom">
                    <v-text-field
                    @keyup.enter="joinRoom"
                    v-if="$store.state.errors.roomName"   
                    v-model="roomName"
                    label="Room Name"
                    color="#a04b4b"
                    outline
                    required
                    :rules="[() => $store.state.errors.roomName]"
                    error
                    height=5
                    ></v-text-field>
                    <v-text-field
                    @keyup.enter="joinRoom"
                    v-else
                    v-model="roomName"
                    outline
                    color="secondary"
                    label="Room Name"
                    required
                    height=5
                    ></v-text-field>
                    <v-text-field
                    @keyup.enter="joinRoom"
                    v-if="$store.state.errors.password"   
                    v-model="password"
                    label="Password"
                    color="#a04b4b"
                    outline
                    required
                    :rules="[() => $store.state.errors.password]"
                    error
                    height=5
                    ></v-text-field>
                    <v-text-field
                    @keyup.enter="joinRoom"
                    v-else
                    v-model="password"
                    outline
                    color="secondary"
                    label="Password"
                    required
                    height=5
                    ></v-text-field>
                    <v-btn
                    block
                    round
                    id="submitButton"
                    color="secondary"
                    @click="joinRoom"
                    >
                    Join
                    </v-btn>
                </div>
            </div>                
        </v-flex>
    </v-layout>
    <h5 class="text-xs-center darkText">Your rooms can be managed from your <span class="redirect" @click="$router.push('/profile')">profile</span></h5>
</div>
    
</template>
<script>
import firebase from "@/firebase/init.js"
import Validate from "@/validation/joinRoom.js"
import swal from "sweetalert2"
export default {
    data() {
        return {
            password: "",
            roomName: ""
        }
    },
    methods: {
        joinRoom() {
            this.$store.commit("CLEAR_ERRORS");
            let data = {};
            data.roomName = this.roomName.trim();
            data.password = this.password.trim();
            const {errors, isValid} = Validate(data);
            if(!isValid) {
                this.$store.commit("SET_ERRORS", errors);
            } else {
                firebase.firestore().collection("rooms").doc(this.roomName).get()
                .then(doc => {
                    if(doc.exists) {
                        //test for password and commit JOIN_ROOM if it matches
                        if(doc.data().password == this.password) {
                            swal({
                            toast: true,
                            position: "bottom-end",
                            showConfirmButton: false,
                            timer: 3000,
                            type: "success",
                            title: 'Joined "' + data.roomName + '"',
                            customClass: "alert"
                            });  
                            this.$store.dispatch("joinRoom", {id: this.roomName});
                        } else {
                            this.$store.commit("SET_ERRORS", {password: "Incorrect password"})
                        }
                    } else {
                        this.$store.commit("SET_ERRORS", {roomName: "That room doesn't exist (room names are case sensitive)."})
                    }
                })
            }
            
        }
    }
}
</script>

<style scoped>
#joinRoom {
    max-width: 80%;
    margin: 20px auto;
}

h4 {

    display: inline;
    margin-right: 10px;
    margin-left: 30px;
}

</style>
