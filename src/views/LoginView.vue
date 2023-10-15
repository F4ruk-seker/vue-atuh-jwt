<template>
<form @submit.prevent="submit">
  <input type="text" v-model="username" required>
  <input type="text" v-model="password" required>
  <button type="submit">Login</button>
</form>
</template>

<script>
// import {reactive} from 'vue';
// import {useRouter} from "vue-router";
import axios from 'axios';
import AuthService from "@/AuthService";
export default {
  name: "LoginView",
  methods:{
    async submit() {
      var response = await axios.post("http://127.0.0.1:8000/api/token/",
          {"username": this.username, "password": this.password},
          {
            "Content-Type": "application/json"
          },
      )
      if (response.status === 200){
        // const cookies = response.headers['set-cookie'];
        AuthService.setAccessToken(response.data.access)
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        this.$store.commit('setCookies', response.data);
        this.$router.push({name:'home'})
      }

    }
  },
  data() {return{
    username: null,
    password: null
  }
}
}
</script>

<style scoped>

</style>