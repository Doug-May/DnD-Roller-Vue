<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs12>
                <main-roller/>
            </v-flex>
            <v-flex xs12>
                <custom/>
            </v-flex>
        </v-layout>        
    </v-container>
</template>

<script>
import MainRoller from "@/components/utility/MainRoller.vue";
import Custom from "@/components/utility/CustomRollsComp.vue";
export default {
    components: {
        MainRoller,
        Custom
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
