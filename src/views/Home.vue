<template>
    <v-container>
        <v-layout justify-center>
            <v-flex md4 xs12>
                <main-roller/>
            </v-flex>
        </v-layout>        
    </v-container>
</template>

<script>
import MainRoller from "@/components/MainRoller.vue"
export default {
    components: {
        MainRoller
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
