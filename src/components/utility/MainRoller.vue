<template>
    <v-container id="roller" align-center justify-center class="myCard">
        <v-layout row justify-space-between>
            <v-flex xs5>
                <img id="dice" :src="imgSRC" @click="initiateRoll(null)">
            </v-flex>
            <v-flex id="history" xs6>
                <v-menu v-if="this.rollHistory.length > 0" bottom>
                    <h2 class="darkText" slot="activator">History</h2>
                    <v-icon slot="activator" color="secondary" dark>
                        arrow_drop_down
                    </v-icon>
                    <v-list>
                        <v-list-tile v-for="(roll, i) in this.rollHistory" :key="i" @click="initiateRoll(rollHistory[i])">
                            <v-list-tile-title>({{ roll.number }})d{{ roll.diceType}} + {{ roll.modifier}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <div v-else>
                    <h2 class="darkText">History</h2>
                    <h5 class="darkText">Make a Roll</h5>
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
            <v-flex xs2>
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
            <v-flex xs2>
                <v-slide-y-transition>
                    <v-icon v-if="this.number || this.diceType !== 'd20' || this.modifier" @click="clear" slot="activator"
                        id="clear">clear</v-icon>
                </v-slide-y-transition>
            </v-flex>
        </v-layout>
        <v-btn @click="initiateRoll(null)" block round id="submitButton" color="secondary">
            Roll
        </v-btn>
    </v-container>
</template>

<script>
import swal from "sweetalert2";
export default {
    name: "MainRoller",
    data: function() {
        return {                   
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
            ],
            rollHistory: []         
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
            for (let i = 0; i < this.rollHistory.length; i++) {
                if(this.rollHistory[i].number === diceObj.number && this.rollHistory[i].modifier === diceObj.modifier && this.rollHistory[i].diceType === diceObj.diceType) {
                    unique = false
                } 
            }
            if (unique && this.rollHistory.length == 6) {
                this.rollHistory.shift();                        
            } 
            if (unique) {
                this.rollHistory.push(diceObj);                        
            }       
            //send the object off for rolling after rollHistory has been updated                 
            this.makeRoll(diceObj);                      
        },
        makeRoll(diceObj) {         
            let counter = 0;
            let n = diceObj.number;
            let m = diceObj.modifier;
            let t = diceObj.diceType;
            for (let i = 0; i < n; i++) {
                counter += Math.ceil(Math.random()*t);
            }
            let total = counter + m;
            let title = "You rolled: " + total;
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
        max-width: 350px;
        padding: 25px;
    }
    #dice {
        cursor: pointer;
        max-width: 70px;
        margin-left: 25px;
    }
    #clear {
        cursor: pointer;
        margin-left: 20px;
    }
    #rollItem {
        cursor: pointer;
        list-style-type: none;
        margin: 0;
        padding: 0;
        font-size: 12px;
    }
    #history {
        margin-top: 15px;
        margin-left: 35px;
    }
    #plus {
        margin-left: 10px;
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
