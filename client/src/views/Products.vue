<template>
<h1>Products works!</h1>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

axios.get('http://localhost:8000/api/getFridgeInventory?name=fridge1').then((result) => {
  result.data.forEach((item) => {
    console.log(item.name);
  });
});

export default {
  name: 'Home',
  components: {

  },
};
</script>
