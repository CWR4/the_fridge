<template>
  <div>
    <h4 class="fridge-name">{{ fridgeName }}</h4>
    <div class="home-container" v-if="products !== '' || products === []">
      <Item
      v-for="product in products"
      :key="product._name"
      v-bind:item="product"
      v-bind:has-checkbox="true"
      ></Item>
    </div>
    <div v-else>
      Nothing here yet. Let's start by clicking on the button below!
    </div>
    <AddItemButton :shopping-list="true"/>
  </div>
</template>

<script lang="ts">
import { Inject, Vue, Component } from 'vue-property-decorator';
import Item from '@/components/Item.vue';
import AddItemButton from '@/components/AddItemButton.vue';

@Component({
  components: {
    Item,
    AddItemButton,
  },
})
export default class ShoppingList extends Vue {
  products = [];
  // eslint-disable-next-line
  @Inject() axios: any;
  // eslint-disable-next-line
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

  /** Retrieves products of fridge shopping-list from database and saves result in products array */
  getProducts() {
    this.axios.get('http://localhost:8000/api/getfridgeshoppinglist', {
      params: {
        name: this.fridgeName,
      },
      // eslint-disable-next-line
    }).then((result: any) => {
      this.products = result.data;
    }).catch((error: Error) => {
      console.log(error);
    });
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fridge-name {
  margin-top: 20px;
}
</style>
