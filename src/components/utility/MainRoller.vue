<template>
    <v-container id="roller" align-center justify-center class="myCard">
        <v-layout row justify-space-between class="myCardDark logo">
            <v-flex xs5>
                <img id="dice" :src="imgSRC" @click="initiateRoll(null)">
            </v-flex>
            <v-flex id="history" xs6>
                <v-menu v-if="this.$store.state.rollHistory.length > 0" bottom>
                    <h3 slot="activator">History</h3>
                    <v-icon slot="activator" color="secondary" dark>
                        arrow_drop_down
                    </v-icon>
                    <v-list>
                        <v-list-tile v-for="(roll, i) in this.$store.state.rollHistory" :key="i" @click="initiateRoll($store.state.rollHistory[i])">
                            <v-list-tile-title>({{ roll.number }})d{{ roll.diceType}} + {{ roll.modifier}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <div v-else>
                    <h3>History</h3>
                    <h5>Make a Roll</h5>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row justify-space-around align-center>
            <v-flex xs2>
                <v-tooltip top>
                    <v-text-field type="number" min=1 max=100 slot="activator" placeholder="1" v-model="number" color="accent"
                        height="15px" oninput="validity.valid||(value=100);"></v-text-field>
                    <span>Number of Dice</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs3>
                <v-select slot="activator" v-model="diceType" :items="dice" color="accent" height="15px"></v-select>
            </v-flex>
            <v-flex xs2>
                <h2 id="plus" class="text-xs-center darkText">+</h2>
            </v-flex>
            <v-flex xs2>
                <v-tooltip top>
                    <v-text-field type="number" min=0 max=100 slot="activator" placeholder="0" v-model="modifier" color="accent"
                        height="15px" oninput="validity.valid||(value=100);"></v-text-field>
                    <span>Modifier</span>
                </v-tooltip>

            </v-flex>
            <v-flex xs1>
                <v-slide-y-transition>
                    <v-icon v-if="this.number || this.diceType !== 'd20' || this.modifier" @click="clear" slot="activator"
                        id="clear">clear</v-icon>
                </v-slide-y-transition>
            </v-flex>
        </v-layout>
        <v-btn @click="initiateRoll(null)" block round id="submitButton" color="secondary">
            Roll
        </v-btn>
        <v-checkbox
            class="privateMode"
            v-if="this.$store.state.inRoom"
            label="Private Mode"
            v-model="privateMode"
        ></v-checkbox>
    </v-container>
</template>

<script>
import swal from "sweetalert2";
import firebase from "@/firebase/init.js";
import moment from "moment";
export default {
    name: "MainRoller",
    data: function() {
        return {
            privateMode: false,                   
            diceType: "d20",
            number: null,
            modifier: null,
            dice: [
                "d20",
                "d12",
                "d10",
                "d8",
                "d6",
                "d4",
                "d100",
            ]
        }
    },
    methods: {
        clear() {
            this.diceType = "d20";
            this.number = null;
            this.modifier = null;
        },
        initiateRoll(payload) {
            //start animation
            let element = document.getElementById("dice");            
            element.classList.add("roll"); 
            setTimeout(() => {
                element.classList.remove("roll"); 
            }, 400);      
            //check if the roll is for an existing dice object. if not, create a new one. 
            if (payload) {
                this.checkHistory(payload);
            } else {
                let newDice = {};
                newDice.number = parseInt(this.number) || 1;
                newDice.modifier = parseInt(this.modifier) || 0;
                newDice.diceType = parseInt(this.diceType.substr(1));                
                this.checkHistory(newDice);
            }            
        },
        checkHistory(diceObj) {
            //push this roll to history if unique
            let unique = true;         
            for (let i = 0; i < this.$store.state.rollHistory.length; i++) {
                if(this.$store.state.rollHistory[i].number === diceObj.number && this.$store.state.rollHistory[i].modifier === diceObj.modifier && this.$store.state.rollHistory[i].diceType === diceObj.diceType) {
                    unique = false
                } 
            }
            if (unique && this.$store.state.rollHistory.length == 6) {
                this.$store.state.rollHistory.shift();                        
            } 
            if (unique) {
                this.$store.state.rollHistory.push(diceObj);                        
            }       
            //send the object off for rolling after rollHistory has been updated                 
            this.makeRoll(diceObj);                      
        },
        makeRoll(diceObj) {         
            let counter = 0;
            let roll = {};
            roll.userName = this.$store.state.userName;
            roll.room = this.$store.state.roomID;
            roll.timestamp = Date.now();
            let n = diceObj.number;
            let m = diceObj.modifier;
            let t = diceObj.diceType;
            for (let i = 0; i < n; i++) {
                counter += Math.ceil(Math.random()*t);
            }
            let total = counter + m;
            roll.attack = total;
            let title = "You rolled: " + total;

            //Add "natural" messages if only one dice was rolled
            if(n == 1 && t == 20 && counter == 20) {
                title = "Natural 20!\n" + title;
            }
            if(n == 1 && t== 20 && counter == 1) {
                title = "Natural 1!\n" + title;
            }

            //if in a room, add the result to firebase messages
            if(this.$store.state.inRoom && !this.privateMode) {
                firebase.firestore().collection("messages").doc().set(roll);
            }

            swal({                  
                    position: 'top',                    
                    title: title,
                    showConfirmButton: false,
                    customClass: "alert"                                   
                })            
        }
    },
    computed: {
        imgSRC() {
            return require("@/assets/dice/" + this.diceType + ".png");
        }
    }
}
</script>

<style scoped>
    #roller {
        max-width: 320px;
        padding: 25px;
    }
    .logo {
        margin-bottom: 10px;
    }
    #dice {
        cursor: pointer;
        max-width: 70px;
        margin-left: 35px;
        margin: 7px 0px 2px 35px;
    }
    #clear {
        cursor: pointer;
        margin-left: 10px;
    }
    #rollItem {
        cursor: pointer;
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 12px;
    }
    #history {
        margin-top: 20px;
        margin-left: 35px;
    }
    .privateMode {
        margin-bottom: -30px;
    }
    h3{
        font-size: 20px;
    }  
    h5{
        margin-top: -5px;
    }
    .roll{
        animation: roll 300ms ease-in-out;
    }
    @keyframes roll {
        0% {
        }
        100% {
            transform: rotate(1440deg);
        }
    }  
    .rollList-enter-active, .rollList-leave-active {
        transition: all 500ms;
    }
    .rollList-enter, .rollList-leave-to /* .rollList-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(5px);
    }
</style>
