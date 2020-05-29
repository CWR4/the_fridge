<template>
    <!-- eslint-disable max-len -->
    <div class="home-container">
      <h1>Welcome to {{ fridgeName }}</h1>
      <ul>
        <li v-for="product in products" :key="product._name">
            id: {{ product.id }} |
            name: {{ product.name }} |
            amount: {{ product.amount }} |
            alwaysAvailable: {{ product.always_available }} |
            minAmount: {{ product.min_amount }} |
            fridgeId: {{ product.fridge_id }} |
            purchased: {{ product.purchased }} |
            amountToBuy: {{ product.amount_to_buy }} |
        </li>
      </ul>
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
