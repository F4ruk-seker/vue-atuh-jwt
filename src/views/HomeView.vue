<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <strong> : {{ message }}</strong>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import axios from 'axios';

export default {
  name: "HomeView",
  setup() {
    const message = ref('You are not logged in!');
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/say-my-name/')
        console.log(response.headers)
        const content = await response;
        console.log(content)
        message.value = `Hi ${content.data}`;

        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });

    return {
      message
    }
  }
}
</script>
