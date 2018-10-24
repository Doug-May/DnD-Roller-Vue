<template>
  <div>
    <div @keyup.prevent.enter="sendEmail" ref="form" lazy-validation class="loginBox myCard">
      <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
      <h2 class="darkText text-xs-center">Reset Password</h2>
      <p class="darkText">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
    <v-text-field
      v-if="$store.state.errors.email"   
      v-model="email"
      label="E-mail"
      color="#a04b4b"
      outline
      required
      :rules="[() => $store.state.errors.email]"
      error
    ></v-text-field>
    <v-text-field
      v-else
      v-model="email"
      outline
      color="secondary"
      label="E-mail"
      required
    ></v-text-field>
    <v-btn
      block
      round
      id="submitButton"
      color="secondary"
      @click="sendEmail"
    >
    Send Email
    </v-btn>
  </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init.js"
import swal from "sweetalert2";
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    sendEmail() {
      this.$store.commit("CLEAR_ERRORS");
      firebase.auth().sendPasswordResetEmail(this.email.trim())
      .then(() => {
        swal({
        showConfirmButton: true,
        type: "success",
        title: "Success",
        text: "An email was sent to " + this.email.trim(),
        customClass: "alert"
        });
        this.$router.push("/login");
      })
      .catch(error => {
        let payload = {};
        if (error.code == "auth/invalid-email") {
          payload.email = "Invalid Email";
        }
        if (error.code == "auth/user-not-found") {
          payload.email = "There Is No User With That Email";
        }
        this.$store.commit("SET_ERRORS", payload);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#submitButton {
  margin: 0 auto;
  width: 60%;
  color: black;
  letter-spacing: 1px;
}
</style>