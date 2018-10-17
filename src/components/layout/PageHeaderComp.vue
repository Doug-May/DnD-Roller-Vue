<template>
  <div id="header">
    <v-container>
      <v-toolbar flat color="#353331">
        <v-layout row>
          <v-flex xs12>            
            <img id="logo" @click="$router.push('/')" src="@/assets/logo.png">            
            <h4 
            v-if="!$store.state.uid"
            class="headerLink" 
            @click="$router.push('/login')">
            Login</h4>                
            <h4 
            v-if="$store.state.uid"
            class="headerLink" 
            @click="logout">
            Logout</h4>
            <h4
            v-if="$store.state.uid"      
            class="headerLink" 
            @click="$router.push('/profile')">
            Profile</h4>                                                                           
            <h4      
            class="headerLink" 
            @click="$router.push('/about')">
            About</h4>                                       
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PageHeaderComp",
  data: function() {
    return {};
  },
  methods: {
    logout() {      
      this.$store.dispatch("logout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
  float: left;
  margin-top: -15px;
  transition: 200ms;
  width: 40px;
  cursor: pointer;
  font-size: 48px;
}
.headerLink {
  font-weight: 400;
  float: right;
  margin: 0px 10px;
  transition: 200ms;
  font-size: 14px;
  letter-spacing: 2px;
  cursor: pointer;
  color: #b0b0b0;
}
.headerLink:hover {
  color: #4e5b6d;
}
#menu {
  float: right;
  margin-left: 8%;
}
</style>
