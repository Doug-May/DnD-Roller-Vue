<template>
<div>
    <v-layout row wrap justify-center>
        <v-flex xs12>
            <main-roller/>
        </v-flex>
    </v-layout>  
    <div v-if="this.$store.state.uid">
        <v-layout row wrap justify-center>
            <v-flex lg9 md10 sm6 xs12 >
                <custom/>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-flex lg9 md10 sm6 xs12 >
                <room/>
            </v-flex>
        </v-layout>                                
    </div>
    <div v-else>                
        <h4 class="text-xs-center">Login for online features!</h4>    
    </div> 
</div>    
                   
                  
</template>

<script>
import MainRoller from "@/components/utility/MainRoller.vue";
import Custom from "@/components/utility/CustomRollsComp.vue";
import Room from "@/components/utility/Room.vue";
export default {
    components: {
        MainRoller,
        Custom,
        Room
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
