<template>
<div id="app" class="fadeIn">
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
    this.$store.dispatch("refreshUser");                 
  }
}
</script>

<style>
* {
  text-transform: none !important;
}

body {
  padding-right: 0 !important;
  background-color: #353331;
}

#app {
  color: #d0d0d0;
  font-family: "Roboto", sans-serif;
  background-image: url("./assets/background.jpg");
  background-size: 150% auto;
  background-attachment: fixed;
}

.myCard {
  background-color: #fff;
  padding: 5px;
  margin: 12px auto;
  border-radius: 10px;
  box-shadow: 5px 5px 25px #151515;
  max-width: 850px;
}

.myCardDark {
  background-color: #353331;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #d6d4d4;
  max-width: 300px;
  margin: 0px auto;
}

.flexWrapper {
 padding: 7px;
 margin: 0px auto;
 width: 100%;
}

.loginBox {
  max-width: 700px;
  margin: auto;
  padding: 20px 30px 30px 30px;
}

.alert {
  font-family: "Roboto", sans-serif !important;
  box-shadow: none !important;
}

.alert h1,h2,h3,h4,h5 {
  font-weight: 300 !important;
  letter-spacing: 2px !important;
}

.backButton {
  position: absolute;
  cursor: pointer;
}


a {
  text-decoration: none;
}

h1,h2,h3,h4,h5 {
  font-weight: 300;
  letter-spacing: 2px;
  margin-top: 5px;
}

h1 {
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 10px;
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
  color: #292e35;
}

.spacerLine {
  width: 100%;
  height: 20px;
  margin-top: 20px;
  border-top: 1px solid #d0d0d0;
}

.router-anim-enter-active {
  animation: coming 350ms;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 350ms;
}
.fadeIn {
  opacity: 0;
  animation: fadeIn 1000ms forwards 1;
  animation-delay: 500ms;
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
@keyframes fadeIn {
  from {
    /* transform: translate(0px, 30px); */
    opacity: 0;
  }
  to {
    /* transform: translate(0px, 0px); */
    opacity: 1;
  }
}
</style>
