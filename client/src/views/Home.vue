<template>
    <!-- eslint-disable max-len -->
    <div class="home-container">
      <h1>Welcome to {{ fridgeName }}</h1>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data: () => ({
    products: [],
  }),
  mounted() {
    console.log(this.fridgeName);
    axios.get('http://localhost:8000/api/getFridgeShoppingList', {
      params: {
        name: this.fridgeName,
      },
    }).then((result) => {
      this.products = result.data;
      console.log(result.data);
    });
  },
  methods: {
  },
  computed: {
    fridgeName() {
      return localStorage.getItem('userFridge');
    },
  },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
