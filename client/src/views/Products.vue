<template>
<div>
    <h1>Products works!</h1>
    <ul>
        <li v-for="product in products" :key="product._id">
            Produkt: {{ product.name }} |
            Menge: {{product.amount }}
        </li>
    </ul>
</div>

</template>

<script>
// @ is ant alias to /src

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
    axios.get('http://localhost:8000/api/getFridgeInventory?name=fridge1').then((result) => {
      this.products = result.data;
    });
  },
};
</script>
