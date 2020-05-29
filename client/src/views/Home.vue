<template>
    <!-- eslint-disable max-len -->
    <div class="home-container">
      <h1>Welcome to {{ fridgeName }}</h1>
      <ul>
        <li v-for="product in products" :key="product._id">
            id: {{ product.id }} |
            name: {{ product.name }} |
            amount: {{product.amount }} |
            alwaysAvailable: {{product.alwaysAvailable }} |
            minAmount: {{product.minAmount }} |
            fridgeId: {{product.fridgeId }} |
            purchased: {{product.purchased }} |
            amountToBuy: {{product.amountToBuy }} |
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
    product: {
      id: '',
      name: '',
      amount: '',
      alwaysAvailable: '',
      minAmount: '',
      fridgeId: '',
      purchased: '',
      amountToBuy: '',
    },
  }),
  mounted() {
    console.log(this.fridgeName);
    axios({
      method: 'get',
      url: `http://localhost:8000/api/getFridgeInventory?name=${this.fridgeName}`,
    }).then((result) => {
      console.log(result);
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
