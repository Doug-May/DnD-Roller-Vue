<template>
    <div class="textBlock">
        <h1>Profile</h1>
        <h3>{{ userName }}<br>{{ email }}</h3>
        <div class="spacerLine"></div>
        <h1>Rooms</h1>
        <h3 v-if="this.$store.state.rooms.length == 0">You don't have any rooms yet!</h3>
        <div v-else>
            <div v-for="(room, i) in this.$store.state.rooms" :key="i">
                <div class="flexWrapper">
                    <div id="roomCard">
                        <v-layout row align-center>
                            <v-flex xs 10>
                                <h4 class="darkText">{{ room.docID }}</h4>
                                <h5 class="darkText">Password: {{ room.password}}</h5>
                            </v-flex>
                            <v-flex xs2>
                                <v-icon class="icon" color="error" @click="deleteRoom(room.docID, i)" size="30px">delete</v-icon>
                            </v-flex>
                        </v-layout>
                    </div>
                </div>                                                
            </div>
        </div>
        <v-btn v-if="this.$store.state.rooms.length < 4" id="button" round color="secondary" @click="$router.push('/createroom')">Create A Room</v-btn>
    </div>
</template>

<script>
import firebase from "@/firebase/init.js"
export default {
    name: "profile",
    data() {
        return {
            userName: this.$store.state.userName,
            email: this.$store.state.email        
        }
    },
    methods: {
        deleteRoom(id, i) {
            firebase.firestore().collection("rooms").doc(id).delete()
            .then(() => {
                this.$store.state.rooms = this.$store.state.rooms.filter(room => {
                    return room.docID != id;
                })
                firebase.firestore().collection("messages").where("room", "==" ,id).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        firebase.firestore().collection("messages").doc(doc.id).delete();
                    })
                })
                
                alert("successfully deleted room");
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
    #roomCard {
        width: 300px;  
        background-color: #f4f4f4;
        padding: 5px;
        margin: 5px 0px;
        border-radius: 10px;
        box-shadow: 5px 5px 25px #151515;     
    }
    h3 {
        margin-right: 20px;
        margin-left: 30px;
        margin-bottom: 10px;
    }

    h4, h5 {
        margin: 10px 5px 10px 30px;
    }

    
    .icon {
        bottom: 5px;
        right: 5px;
        cursor: pointer;
    }

    #button {
        margin-top: 20px;
    }

</style>

