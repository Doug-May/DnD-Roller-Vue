<template>
    <div id="custom" class="myCard">
        <h2 class="darkText text-xs-center">Custom Rolls</h2>
        <loader v-if="loading" />
        <div v-else>
            <div v-if="this.$store.state.rolls.length == 0">
                <h4 class="text-xs-center darkText">Your saved rolls will show up here</h4>
            <v-btn @click="$router.push('/add')" id="createRoll" color="secondary" round block>Create A Roll</v-btn>
            </div>
            
            <v-tooltip bottom>
                <v-icon slot="activator" v-if="this.$store.state.rolls.length < 8 && this.$store.state.rolls.length > 0" id="addRoll" color="secondary" size="35" @click="$router.push('/add')">add_circle</v-icon>
                <span>Add Custom Roll</span>
            </v-tooltip>
            
            <v-layout row justify-space-between wrap>
                <v-flex lg4 md4 sm6 xs12 v-for="(roll, i) in this.$store.state.rolls" :key="i" class="flexWrapper">
                    <v-layout row wrap justify-space-around align-center class="myCardDark">
                        <v-flex xs12>
                            <h3 class="text-xs-center">{{ roll.name }}</h3>
                        </v-flex>
                        <v-flex xs7>
                            <p><span class="greenText">Roll:</span> ({{ roll.attack.n }})d{{
                                roll.attack.t}}+{{roll.attack.m}}</p>
                            <p v-if="roll.damage"><span class="redText">Damage:</span> ({{ roll.damage.n }})d{{
                                roll.damage.t}}+{{roll.damage.m}}</p>
                            <p v-else class="redText">No Damage Roll</p>
                            <div id="icons">
                                <v-icon class="icons" color="#d0d0d0" size="22" @click="$router.push({
                                    name: 'edit', params: {slug: roll.slug}
                                })">edit</v-icon>
                                <v-icon class="icons" color="#d0d0d0" size="22" @click="deleteRoll(roll.id)">delete</v-icon>
                            </div>
                        </v-flex>
                        <v-flex xs2>
                            <v-btn @click="rollCustom(i)" class="rollButton" color="secondary" round>Roll</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/layout/Loader.vue";
import swal from "sweetalert2";
import firebase from "@/firebase/init.js";
const db = firebase.firestore();
import store from "@/store.js";
import moment from "moment";
export default {
    components: {
        Loader
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        deleteRoll(id) {
            swal({
            title: "Delete Roll?",
            showCancelButton: true,
            confirmButtonColor: '#e06b6b',
            cancelButtonColor: '#596177',
            confirmButtonText: 'Yes, Delete It',
            customClass: "alert"
            }).then((result) => {
            if (result.value) {
                db.collection("rolls").doc(id).delete()
                .then(() => {
                    store.state.rolls = store.state.rolls.filter(roll => {
                        return roll.id != id;
                    })
                    swal({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 3000,
                    type: "success",
                    title: "Deleted!",
                    customClass: "alert"
                    });
                })
            }
            });
        },    
        rollCustom(i) {
            let roll = {};
            roll.userName = store.state.userName;
            roll.room = store.state.roomID;
            roll.timestamp = Date.now();
            let diceObj = store.state.rolls[i];
            let counter = 0;
            let n = diceObj.attack.n;
            let m = diceObj.attack.m;
            let t = diceObj.attack.t;        
            for (let i = 0; i < n; i++) {
                counter += Math.ceil(Math.random()*t);
            }
            let attackTotal = counter + m;
            roll.attack = attackTotal;
            let title = "Roll: " + attackTotal.toString();
            

            if(diceObj.damage) {
                let counter = 0;
                let n = diceObj.damage.n;
                let m = diceObj.damage.m;
                let t = diceObj.damage.t;
                for (let i = 0; i < n; i++) {
                    counter += Math.ceil(Math.random()*t);
                }
                let damageTotal = counter + m;
                roll.damage = damageTotal
                title += "\nDamage: " + damageTotal.toString();
            }

            //if in a room, add the result to firebase messages
            if(store.state.inRoom) {
                firebase.firestore().collection("messages").doc().set(roll);
            }

            //Alert the user of the result
            swal({                  
                position: 'top',                    
                title: title,
                showConfirmButton: false,
                customClass: "alert"                                   
            });
        }
    }
}
</script>

<style scoped>
    #custom {
        position: relative;
    }
    p {
        letter-spacing: 1.5px;
        font-size: 11px;
        margin: 2px;
    }
    h3 {
        font-size: 20px;
        margin-bottom: 2px;
    }
    .icons {
        display: inline;
        cursor: pointer;
        margin: 0px 5px;
    }
    .rollButton {    
        margin-left: -50px;
    }
    .redText {
        color: #e06d6d;
    }
    .greenText {
        color: #4fad62;
    }
    #addRoll {
        cursor: pointer;
        position: absolute;
        top: -43px;
        right: -40px;
    }
    #createRoll {
        width: 200px;
        margin: 20px auto;
    }
</style>

