<template>
    <div id="custom" class="myCard">
        <h2 class="darkText text-xs-center">Custom Rolls</h2>
        <loader v-if="loading" />
        <v-container v-else align-center>
            <h4 class="text-xs-center darkText" v-if="rolls.length == 0">Your saved rolls will show up here</h4>
            <v-icon v-if="rolls.length < 8" id="addRoll" color="secondary" size="35" @click="$router.push('/add')">add_circle</v-icon>
            <v-layout row justify-space-between wrap>
                <v-flex xlg3 lg4 md6 xs12 v-for="(roll, i) in rolls" :key="i" class="flexWrapper">
                    <v-layout row wrap justify-space-around align-center class="myCardDark">
                        <v-flex xs12>
                            <h3 class="text-xs-center">{{ roll.name }}</h3>
                        </v-flex>
                        <v-flex xs7>
                            <p><span class="blueText">Roll:</span> ({{ roll.attack.n }})d{{
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
                            <v-btn @click="rollCustom(rolls[i])" class="rollButton" color="secondary" round>Roll</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Loader from "@/components/layout/Loader.vue";
import swal from "sweetalert2";
import firebase from "@/firebase/init.js";
const db = firebase.firestore();
export default {
    components: {
        Loader
    },
    data() {
        return {
            rolls: [],
            loading: true
        }
    },
    methods: {
        deleteRoll(id) {
            db.collection("rolls").doc(id).delete()
            .then(() => {
                this.rolls = this.rolls.filter(roll => {
                    return roll.id != id;
                })
            })
        },    
        rollCustom(diceObj) {
            let counter = 0;
            let n = diceObj.attack.n;
            let m = diceObj.attack.m;
            let t = diceObj.attack.t;        
            for (let i = 0; i < n; i++) {
                counter += Math.ceil(Math.random()*t);
            }
            let attackTotal = counter + m;
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
                title += "\nDamage: " + damageTotal.toString();
            }
            swal({                  
                position: 'top',                    
                title: title,
                showConfirmButton: false,
                customClass: "alert"                                   
            });
        }
    },    
    created() {
        //clear the rolls array
        this.rolls = [];
        //fetch data from firestore
        db.collection("rolls").where("id", "==", this.$store.state.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let roll = doc.data();
                roll.id = doc.id;
                this.rolls.push(roll);
            });            
                this.loading = false;            
        })
    }  
}
</script>

<style scoped>
    #custom {
        position: relative;
        max-width: 1100px;
        min-width: 340px;           
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
        margin-left: -30px;
    }
    .redText {
        color: #e06d6d;
    }
    .blueText {
        color: #869ccc;
    }
    #addRoll {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>

