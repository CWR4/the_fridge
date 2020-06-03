<template>
  <div>
    <div class="home-container" v-if="products !== '' || products === []">
      <h1>Welcome to {{ fridgeName }}</h1>
      <Item
      v-for="product in products"
      :key="product._name"
      v-bind:item="product"
      v-bind:has-checkbox="false"
      ></Item>
    </div>
    <div v-else>
      Nothing here yet. Let's start by clicking on the button below!
    </div>
  </div>
</template>

<script lang="ts">
import { Inject, Vue, Component } from 'vue-property-decorator';
import Item from '../components/Item.vue';

@Component({
  components: {
    Item,
  },
})
export default class Inventory extends Vue {
  products = [];

  @Inject() axios: any;

  @Inject() eventBus: any;

  created() {
    this.getProducts();
  }

  mounted() {
    this.eventBus.$on('update', () => {
      this.getProducts();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get fridgeName(): string|null {
    return localStorage.getItem('userFridge');
  }

  getProducts() {
    console.log(this.fridgeName);
    this.axios.get('http://localhost:8000/api/getFridgeInventory', {
      params: {
        name: this.fridgeName,
      },
    }).then((result: any) => {
      this.products = result.data;
      console.log(result.data);
    });
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
