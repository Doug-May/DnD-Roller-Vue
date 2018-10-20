<template>
    <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6 class="flexWrapper" v-if="this.$store.state.rooms.length > 0" id="myRooms">
                <div class="myCardDark">
                    <h2 class="text-xs-center">My Rooms</h2>
                    <div id="roomCard" v-for="(room, i) in this.$store.state.rooms" :key="i">
                        <h4 class="text-xs-center">{{ room.docID }}</h4>
                        <v-btn round color="secondary" @click="joinMyRoom(room.docID)">Join</v-btn>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 md6 class="flexWrapper">
                <div>
                    <h2 class="text-xs-center darkText">Join a Room</h2>
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
                        ></v-text-field>
                        <v-text-field
                        @keyup.enter="joinRoom"
                        v-else
                        v-model="roomName"
                        outline
                        color="secondary"
                        label="Room Name"
                        required
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
                        ></v-text-field>
                        <v-text-field
                        @keyup.enter="joinRoom"
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
                        @click="joinRoom"
                        >
                        Join
                        </v-btn>
                    </div>
                </div>                
            </v-flex>
    </v-layout>
</template>
<script>
import firebase from "@/firebase/init.js"
import Validate from "@/validation/joinRoom.js"
export default {
    data() {
        return {
            password: "",
            roomName: ""
        }
    },
    methods: {
        joinMyRoom(id) {
            this.$store.dispatch("joinRoom", {id: id});
        },
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
                            alert("success");
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
    max-width: 350px;
    margin: auto;
}

h4 {

    display: inline;
    margin-right: 10px;
    margin-left: 30px;
}
</style>
