<template>
    <div>
        <h3 class="darkText text-xs-center">You are in the room "{{ this.$store.state.roomID }}"</h3>
    </div>
    
</template>
<script>
import firebase from "@/firebase/init.js";
export default {
    data() {
        return {

        }
    },
    created() {
        let ref = firebase.firestore().collection("messages").where("room", "==", this.$store.state.roomID)

        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == "added") {
                    let doc = change.doc;
                    this.$store.commit("UPDATE_MESSAGES", doc.data());
                }
            })
        })
    }
}
</script>

<style scoped>

</style>