<template>
  <div>
    <div @keyup.prevent.enter="login" ref="form" lazy-validation class="loginBox myCard">
      <v-icon class="backButton" @click="$router.go(-1)">keyboard_backspace</v-icon>
      <h2 class="darkText text-xs-center">Login</h2>
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
    
    <v-btn
      block
      round
      id="submitButton"
      color="secondary"
      @click="login"
    >
    Submit
    </v-btn>
    <p class="redirect darkText forgot" @click="$router.push('/resetpassword')">Forgot your password?</p>
  </div>
  <p>Click <span class="redirect" @click="$router.push('/register')">here</span> to create an account</p>
  </div>
</template>

<script>
import firebase from "@/firebase/init.js"
export default {
  name: "Login",
  data: function() {
    return {
      password: "",
      email: "",
      show1: false
    };
  },
  methods: {
    login: function() {
      this.$store.commit("CLEAR_ERRORS");
      const req = {
        email: this.email.trim(),
        password: this.password.trim()
      };
      this.$store.dispatch("login", req);
    }
  },
  created() {
    if(this.$store.state.uid) {
      this.$router.push("/");
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

.forgot {
  margin: 20px auto -15px auto;
}

h1 {
  margin-bottom: 20px;
}
</style>
