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
import Header from '@/components/PageHeaderComp.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  beforeCreate() {
      this.$store.dispatch("checkPersisted");      
  }
}
</script>

<style>
* {
  text-transform: none !important;
}

#app {
  background-color: #353331;
  color: #c0c0c0;
  font-family: "Roboto", sans-serif;
}

a {
  text-decoration: none;
}

h1 {
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: 3px;
}

p {
  letter-spacing: 1px;
  font-size: 14px;
  font-weight: 200;
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
