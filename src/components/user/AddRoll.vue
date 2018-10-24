<template>
    <div @keyup.prevent.enter="addRoll" id="add" class="loginBox myCard">
        <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
        <h2 class="darkText text-xs-center">Create Roll</h2>
        <v-text-field
        v-if="$store.state.errors.addName"   
        v-model="name"
        label="Name of Roll"
        color="#a04b4b"
        outline
        required
        :rules="[() => $store.state.errors.addName]"
        error
        ></v-text-field>
        <v-text-field
        v-else
        label="Name of Roll"
        color="secondary"
        outline
        required
        v-model="name"
        ></v-text-field>

        <v-layout row justify-space-around align-center class="addRow">
            <v-flex xs3>
                <v-tooltip top>
                    <v-text-field type="number" min=1 max=100 slot="activator" placeholder="1" v-model="attackNumber" color="accent"
                        height="15px" oninput="validity.valid||(value=100);" outline></v-text-field>
                    <span>Number of Dice</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs4>
                <v-select outline slot="activator" v-model="attackType" :items="dice" color="accent" height="15px"></v-select>
            </v-flex>
            <v-flex xs1>
                <h2 id="plus" class="text-xs-center darkText">+</h2>
            </v-flex>
            <v-flex xs3>
                <v-tooltip top>
                    <v-text-field outline type="number" min=0 max=100 slot="activator" placeholder="0" v-model="attackModifier" color="accent"
                        height="15px" oninput="validity.valid||(value=100);"></v-text-field>
                    <span>Modifier</span>
                </v-tooltip>
            </v-flex>            
        </v-layout>
        <v-checkbox
            label="Include Damage Roll?"
            v-model="addDamage"
        ></v-checkbox>
        <v-layout v-if="addDamage" row justify-space-around align-center class="addRow">
            <v-flex xs3>
                <v-tooltip top>
                    <v-text-field type="number" min=1 max=100 slot="activator" placeholder="1" v-model="damageNumber" color="accent"
                        height="15px" oninput="validity.valid||(value=100);" outline></v-text-field>
                    <span>Number of Dice</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs4>
                <v-select outline slot="activator" v-model="damageType" :items="dice" color="accent" height="15px"></v-select>
            </v-flex>
            <v-flex xs1>
                <h2 id="plus" class="text-xs-center darkText">+</h2>
            </v-flex>
            <v-flex xs3>
                <v-tooltip top>
                    <v-text-field outline type="number" min=0 max=100 slot="activator" placeholder="0" v-model="damageModifier" color="accent"
                        height="15px" oninput="validity.valid||(value=100);"></v-text-field>
                    <span>Modifier</span>
                </v-tooltip>
            </v-flex>            
        </v-layout>
        <v-btn
        block
        round
        id="createButton"
        color="secondary"
        @click="addRoll"
        >
        Add Custom Roll
        </v-btn>


        
    </div>    
</template>

<script>
import firebase from "@/firebase/init.js";
const db = firebase.firestore();
import slugify from "slugify";
import Validate from "@/validation/addRoll.js";
export default {
    name: "add",
    data() {
        return {
            errors: {},
            dice: [
                "d20",
                "d12",
                "d10",
                "d8",
                "d6",
                "d4",
                "d100",
            ],
            name: "",
            addDamage: false,
            attackNumber: null,
            attackType: "d20",
            attackModifier: null,
            damageNumber: null,
            damageType: "d8",
            damageModifier: null
        }
    },
    methods: {
        addRoll() {
            this.$store.commit("CLEAR_ERRORS");
            const {errors, isValid} = Validate({addName: this.name.trim()});
            if (!isValid) {
                this.$store.commit("SET_ERRORS", errors);
            } else {
                //add the document to the collection if the user has less than 8
                db.collection("rolls").where("id", "==", this.$store.state.uid).get()
                .then(snapshot => {              
                    if (snapshot.size <= 8) {
                        let newRoll = {};
                        newRoll.name = this.name.trim();
                        newRoll.slug = slugify(this.name.trim(), {
                            replacement: '-',
                            remove: /[$*_+~.()'"!\-:@]/g,
                            lower: true
                        });
                        newRoll.id = this.$store.state.uid;
                        newRoll.attack = {};
                        newRoll.attack.t = parseInt(this.attackType.substr(1));
                        newRoll.attack.n = parseInt(this.attackNumber) || 1;
                        newRoll.attack.m = parseInt(this.attackModifier) || 0;
                        if (this.addDamage) {
                            newRoll.damage = {};
                            newRoll.damage.t = parseInt(this.damageType.substr(1));
                            newRoll.damage.n = parseInt(this.damageNumber) || 1;
                            newRoll.damage.m = parseInt(this.damageModifier) || 0;
                        }
                        db.collection("rolls").add(newRoll)
                        .then(() => {
                            this.$store.dispatch("refreshUser");
                            this.$router.push("/");
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    } else {
                        //return error too many custom rolls
                        alert("too many rolls. max of 8");
                    }
                      
                })
                
            }
        }
    }
}
</script>

<style scoped>
    .addRow {
        max-width: 400px;
    }
    h1 {
        margin-bottom: 20px;
    }
    #plus {
        margin-top: -30px;
    }
    #createButton {
        max-width: 200px;
        margin: auto;
    }
</style>

