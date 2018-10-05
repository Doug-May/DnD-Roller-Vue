<template>
<div id="custom" class="myCard">
    <loader v-if="loading"/>
    <v-container
    v-else     
    align-center>
    
        <v-layout row justify-space-between wrap>
            
            <v-flex lg4 xs12 v-for="(roll, i) in rolls" :key="i" class="flexWrapper">            
                <v-layout row justify-space-around class="myCardDark">
                    <v-flex xs9>
                        <h3>{{ roll.name }}</h3>
                        <p>Attack: ({{ roll.attack.number }})d{{ roll.attack.type}}+{{roll.attack.modifier}}</p>
                        <p>Damage: ({{ roll.damage.number }})d{{ roll.damage.type}}+{{roll.damage.modifier}}</p>
                        <div id="icons">
                            <v-icon class="icons" color="#d0d0d0" size="16">edit</v-icon>
                            <v-icon class="icons" color="error" size="16">delete</v-icon>
                        </div> 
                    </v-flex>
                    <v-flex xs1>
                        <v-btn
                        class="rollButton"
                        color="secondary"
                        round
                        >Roll</v-btn>                                       
                    </v-flex>
                </v-layout>                        
            </v-flex> 
                      
               
        </v-layout>     
           
        
    </v-container>
</div>

    
</template>

<script>
import Loader from "@/components/layout/Loader.vue";
export default {
    components: {
        Loader
    },
    data() {
        return {
            rolls: [
                {
                    name: "Dagger",
                    attack: {
                        number: 1,
                        type: 20,
                        modifier: 5
                    },
                    damage: {
                        number: 2,
                        type: 8,
                        modifier: 4
                    }
                },
                {
                    name: "Sword",
                    attack: {
                        number: 1,
                        type: 20,
                        modifier: 5
                    },
                    damage: {
                        number: 3,
                        type: 6,
                        modifier: 4
                    }
                },
                {
                    name: "Sword",
                    attack: {
                        number: 1,
                        type: 20,
                        modifier: 5
                    },
                    damage: {
                        number: 3,
                        type: 6,
                        modifier: 4
                    }
                }
            ],
            loading: true
        }
    }    
}
</script>

<style scoped>
    #custom {
        position: relative;       
        width: 100%;
    }
    p {
        letter-spacing: 0px;
        font-size: 10px;
        margin: 2px;
    }
    .icons {
        display: inline;
        cursor: pointer;
        margin: 0px 5px;
    }
    .rollButton {
        margin-top: 20px;
        margin-left: -70px;
    }
</style>

