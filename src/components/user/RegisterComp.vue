<template>
  <div>
    <div @keyup.prevent.enter="register" ref="form" lazy-validation class="loginBox myCard">
      <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
      <h2 class="darkText text-xs-center">Register</h2>
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
      v-model="userName"
      outline
      color="secondary"
      label="User Name"
      required
    ></v-text-field>

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

    <v-text-field
      v-if="$store.state.errors.password"
      v-model="password"
      outline
      label="Password"
      required
      :rules="[() => $store.state.errors.password]"
      error
      :type="show1 ? 'text' : 'password'"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-text-field
      v-else
      v-model="password"
      color="secondary"
      outline
      label="Password"
      required
      :type="show1 ? 'text' : 'password'"
      :append-icon="show1 ? 'visibility' : 'visibility_off'"
      @click:append="show1 = !show1"
    ></v-text-field>

   <v-text-field
      v-if="$store.state.errors.password2"
      v-model="password2"
      outline
      label="Confirm Password"
      required
      :rules="[() => $store.state.errors.password2]"
      error
      :type="show2 ? 'text' : 'password'"
      :append-icon="show2 ? 'visibility' : 'visibility_off'"
      @click:append="show2 = !show2"
    ></v-text-field>
    <v-text-field
      v-else
      v-model="password2"
      color="secondary"
      outline
      label="Confirm Password"
      required
      :type="show2 ? 'text' : 'password'"
      :append-icon="show2 ? 'visibility' : 'visibility_off'"
      @click:append="show2 = !show2"
    ></v-text-field>

    <v-btn
      block
      round
      id="submitButton"
      color="secondary"
      @click="register"
    >
    Submit
    </v-btn>
  </div>
  <p>Back to <span class="redirect" @click="$router.push('/login')">login</span></p>
  </div>
</template>

<script>
import Validate from "@/validation/registration.js";
export default {
  name: "Register",
  data: function() {
    return {
      userName: "",
      password: "",
      password2: "",
      email: "",
      show1: false,
      show2: false
    };
  },
  methods: {
    register: function() {
      this.$store.commit("CLEAR_ERRORS");
      //build the object for the current component state
      let data = {};
      data.userName = this.userName.trim();
      data.password = this.password.trim();
      data.password2 = this.password2.trim();
      data.email = this.email.trim();
      //Check input validation and dispatch register if it is
      const {errors, isValid} = Validate(data);
      if(!isValid){
          this.$store.commit("SET_ERRORS", errors);
      } else {
        const req = {
        userName: this.userName.trim(),
        email: this.email.trim(),
        password: this.password.trim()       
        };
        this.$store.dispatch("register", req);
      }
    }
  }
};
</script>

<style scoped>

#submitButton {
  margin: 0 auto;
  width: 60%;
  color: black;
  letter-spacing: 1px;
}

p {
  text-align: center;
  margin-top: 30px;
}

h1 {
  margin-bottom: 20px;
}
</style>
