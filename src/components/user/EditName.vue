<template>
    <div @keyup.prevent.enter="editName" id="add" class="loginBox myCard">
        <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
        <h2 class="darkText text-xs-center">Edit User Name</h2>
        <v-text-field
        v-if="$store.state.errors.userName"   
        v-model="userName"
        label="User Name"
        color="#a04b4b"
        outline
        required
        :rules="[() => $store.state.errors.userName]"
        error
        ></v-text-field>
        <v-text-field
        v-else
        label="UserName"
        color="secondary"
        outline
        required
        v-model="userName"
        ></v-text-field>
        <v-btn
        block
        round
        id="createButton"
        color="secondary"
        @click="editName"
        >
        Save
        </v-btn>
    </div>    
</template>

<script>
import firebase from "@/firebase/init.js";
import slugify from "slugify";
const db = firebase.firestore();
import Validate from "@/validation/editUserName.js";
import swal from "sweetalert2";
export default {
    name: "add",
    data() {
        return {
            errors: {},
            userName: ""
        }
    },
    methods: {
        editName() {
            this.$store.commit("CLEAR_ERRORS");
            const {errors, isValid} = Validate({userName: this.userName.trim()});
            if (!isValid) {
                this.$store.commit("SET_ERRORS", errors);
            } else {
                db.collection("users").where("id", "==", this.$store.state.uid).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        db.collection("users").doc(doc.id).update({userName: this.userName.trim()})
                    })
                    this.$store.dispatch("refreshUser");
                    swal({
                            toast: true,
                            position: "bottom-end",
                            showConfirmButton: false,
                            timer: 3000,
                            type: "success",
                            title: "Updated User Name",
                            customClass: "alert"
                            }); 
                    this.$router.push("/profile");
                })
                .catch(error => {
                    console.log(error);
                })    
            }
        }
    },
    created() {
        this.userName = this.$store.state.userName;
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