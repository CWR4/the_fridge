<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';

axios.get('http://localhost:8000/api/getFridgeInventory?name=fridge1').then((result) => {
  result.data.forEach((item) => {
    console.log(item.name);
  });
});

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
