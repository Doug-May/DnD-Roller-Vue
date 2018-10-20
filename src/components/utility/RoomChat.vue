<template>
    <div id="chat">
        <h2 class="darkText text-xs-center">{{ this.$store.state.roomID }}</h2>
        <v-tooltip bottom>
                    <v-icon slot="activator" id="leaveRoom" color="error" size="35" @click="leaveRoom">cancel</v-icon>
                    <span>Leave Room</span>
        </v-tooltip>
        <h4 class="darkText text-xs-center" v-if="this.$store.state.messages.length == 0">No Messages</h4>
         <ul v-else id="messageContainer" v-chat-scroll>
             <li class="message" v-for="(message, i) in this.$store.state.messages" :key="i">
                 <h4 class="darkText messageText"><span class="name">{{ message.userName }}</span> rolled <span class="attack">{{message.attack.toString()}}</span> <span v-if="message.damage"> - <span class="damage">{{ message.damage.toString()}}</span></span></h4>
                 <h5 class="darkText timestamp">{{message.timestamp}}</h5>
                 <div class="line"></div>
             </li>
         </ul>
    </div>
    
</template>
<script>
import firebase from "@/firebase/init.js";
export default {
    data() {
        return {
            unsubscribe: null
        }
    },
    methods: {
        leaveRoom() {
            this.$store.commit("LEAVE_ROOM");
        },
        realTimeChat() {

        }
    },
    created() {
        this.$store.commit("CLEAR_MESSAGES");
        setTimeout(() => {
            this.$store.state.playSound = true;
        },1000);

        
        let ref = firebase.firestore().collection("messages").where("room", "==", this.$store.state.roomID).orderBy("timestamp")

        //Start the real-time listener and update the messages in the store
        this.unsubscribe = ref.onSnapshot(snapshot => {
            //limit snapshot size to 10
            if (snapshot.size > 10) {
                let toDelete = snapshot.size - 10;
                for (let i = 0; i < toDelete; i++) {
                    firebase.firestore().collection("messages").doc(snapshot.docs[i].id).delete()
                }
            }
            //commit new documents to the messages array in the store
            snapshot.docChanges().forEach(change => {
                if(change.type == "added") {
                    let doc = change.doc;
                    this.$store.commit("UPDATE_MESSAGES", doc.data());
                }
            })
        })
        
    },
    destroyed() {
        this.unsubscribe();
        this.$store.state.playSound = false;
    }
}
</script>

<style scoped>
#messageContainer {
    max-height: 220px;
    overflow: auto;
    margin-right: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    list-style: none;
}
#messageContainer::-webkit-scrollbar {
    width: 4px;
}
#messageContainer::-webkit-scrollbar-track {
    background: #ddd;
    border-radius: 4px;
}
#messageContainer::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
}

.messageText {
    font-size: 11px;
}
.name {
    margin-bottom: -30px;
    font-size: 16px;
    color: #5573cc;
}
.attack {
    font-size: 20px;
    color: green;
}
.damage {
    font-size: 20px;
    color: red;
}
.timestamp {
    font-size: 10px;
    margin-top: -5px;
}
.line {
    border-bottom: 1px solid #d0d0d0;
    width: 95%;
    margin-bottom: 15px;
}
#chat {
    position: relative;
}

#leaveRoom {
    cursor: pointer;
    position: absolute;
    top: -45px;
    right: -40px;
}
</style>