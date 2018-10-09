<template>
<div id="app">
  <v-app>
    <Header/>
    <v-container>
      <transition name="router-anim" mode="out-in">
          <router-view/>
        </transition>
    </v-container>    
  </v-app>
</div>  
</template>

<script>
import Header from '@/components/layout/PageHeaderComp.vue'
import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    Header
  },
  created() {
        let user = firebase.auth().currentUser;
        if (user) {        
          this.$store.dispatch("persistedLogin", user);
        }          
  }
}
</script>

<style>
* {
  text-transform: none !important;
}

#app {
  background-color: #353331;
  color: #d0d0d0;
  font-family: "Roboto", sans-serif;
}

.myCard {
  background-color: #f4f4f4;
  padding: 5px;
  margin: 12px auto;
  border-radius: 10px;
  box-shadow: 5px 5px 25px #151515;
  width: 100%;
}

.myCardDark {
  background-color: #353331;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #d6d4d4;
  /* max-width: 400px; */
  margin: 0px auto;
}

.flexWrapper {
 padding: 5px;
 margin: 0px auto;
 width: 100%;
}

.loginBox {
  max-width: 700px;
  margin: auto;
  padding: 30px;
}

.alert {
  font-family: "Roboto", sans-serif !important;
  box-shadow: none !important;
  background-color: #f4f4f4 !important;
  
}

.alert h1,h2,h3,h4,h5 {
  font-weight: 300 !important;
  letter-spacing: 2px !important;
}


a {
  text-decoration: none;
}

h1,h2,h3,h4,h5 {
  font-weight: 300;
  letter-spacing: 2px;
}

p {
  letter-spacing: 2px;
  font-size: 14px;
  font-weight: 300;
}

.redirect {
  transition: 200ms;
  color: #8aabd8;
  cursor: pointer;
}

.redirect:hover {
  transition: 200ms;
  opacity: 0.4;
}

.textBlock {
  max-width: 800px;
  margin: auto;
}
.lightText {
  color: #d0d0d0;
}

.darkText {
  color: #4e5b6d;
}

.router-anim-enter-active {
  animation: coming 500ms;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 500ms;
}
@keyframes going {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(3px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateY(3px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
