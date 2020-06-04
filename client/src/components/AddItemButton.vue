<template>
  <div class="container text-center" style="padding: 0">
    <div class="item-container" v-if="addingItem">
      <div class="row">
        <div class="col-8">
          <input type="text" placeholder="Name..." v-model="newItem.name"/>
        </div>
        <div class="col-4">
          <div v-if="$route.name === 'inventory'">
            <input type="text" placeholder="Amount" v-model="newItem.amount"/>
          </div>
          <div v-else-if="$route.name === 'shopping-list'">
            <input type="text" placeholder="Amount" v-model="newItem.amount_to_buy"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-left">
          <div class="dialog-button safe" @click="saveItem">
            Save
          </div>
        </div>
        <div class="col text-right">
          <div class="dialog-button cancel" @click="closeDialog">
            Cancel
          </div>
        </div>
      </div>
    </div>
    <div class="add-button" style="align-content: center" v-on:click="addItem()" v-else>
      +
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Inject, Prop,
} from 'vue-property-decorator';
import { ItemType } from '../interfaces';

@Component({})
/* eslint-disable */
export default class AddItemButton extends Vue {
  addingItem = false;

  isValid = false;

  allFridgeProducts: any[] = [];

  newItem = {} as ItemType;

  @Prop() shoppingList!: boolean;

  @Inject() axios: any;

  @Inject() eventBus: any;

  // eslint-disable-next-line class-methods-use-this
  get fridgeName(): string|null {
    return localStorage.getItem('userFridge');
  }

  mounted() {
    this.getFridgeId(this.fridgeName!);
  }

  addItem(): void {
    const fridgeName = localStorage.getItem('userFridge');
    this.addingItem = true;
    this.axios.get('http://localhost:8000/api/getAllProducts',
      {
        params: {
          name: fridgeName,
        },
      }).then((result: any) => {
      this.allFridgeProducts = result.data;
      if (this.allFridgeProducts.length <= 0) {
        this.allFridgeProducts = [
          { name: '' },
        ];
      }
    });
  }

  saveItem(): void {
    if (this.allFridgeProducts.find(
      (item: ItemType) => item.name === this.newItem.name,
    ) !== undefined) {
      const product = this.allFridgeProducts.find(
        (productInList: ItemType) => productInList.name === this.newItem.name,
      );
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.newItem.fridge_id = product.fridge_id;
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.newItem.always_available = product.always_available;
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.newItem.min_amount = product.min_amount;
      this.newItem.purchased = product.purchased;
      if (this.shoppingList) {
        this.newItem.amount = product.amount;
      } else if (!this.shoppingList) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.newItem.amount_to_buy = product.amount_to_buy;
      }
      this.axios.post(
        'http://localhost:8000/api/upsertproduct',
        {
          product: this.newItem,
        },
      ).then(() => {
        this.eventBus.$emit('update');
        this.newItem = {} as ItemType;
        this.addingItem = false;
      }).catch((error: Error) => {
        console.log(error);
      });
    } else {
      const parsedId = parseInt(localStorage.getItem('fridgeId')!, 10);
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.newItem.fridge_id = parsedId;
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.newItem.always_available = false;
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.newItem.min_amount = 0;
      if (this.shoppingList) {
        this.newItem.purchased = false;
        this.newItem.amount = 0;
      } else {
        this.newItem.purchased = true;
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.newItem.amount_to_buy = 0;
      }
      this.axios.post(
        'http://localhost:8000/api/upsertproduct',
        {
          product: this.newItem,
        },
      ).then(() => {
        this.eventBus.$emit('update');
        this.newItem = {} as ItemType;
        this.addingItem = false;
      }).catch((error: Error) => {
        console.log(error);
      });
    }
  }

  getFridgeId(fridgeName: string) {
    this.axios.get('http://localhost:8000/api/getFridgeDataByName',
      {
        params: {
          name: fridgeName,
        },
      }).then((result: any) => {
      localStorage.setItem('fridgeId', result.data[0].id);
    }).catch((error: Error) => {
      console.log(error);
    });
  }

  closeDialog(): void {
    this.newItem = {} as ItemType;
    this.addingItem = false;
  }
}
</script>

<style scoped>
.add-button {
  border-radius: 50%;
  height: 40px;
  width: 40px;

  font-size: 24px;
  font-weight: lighter;
  line-height: 40px;
  text-decoration: none;
  text-align: center;
  user-select: none;

  color: #FFFFFF;
  background-color: #0F7195;
  border: 1px #FFFFFF solid;
  margin: 10px auto;
}

.add-button:hover {
  cursor: pointer;
}

.add-button:active {
  box-shadow: 0 0 5px 2px #0F7195;
}

.item-container {
  background-color: #FFFFFF;
  width: 90%;
  max-width: 350px;
  max-height: 150px;
  border-radius: 3px;
  margin: 5px auto;
  line-height: 2rem;

  font-size: 16px;
}

input {
  border: none;
  border-bottom: 1px #8190A5 solid;
  margin: 5px;
  width: 90%;
}

input:focus {
  outline: none;
}

.dialog-button {
  background-color: #0F7195;
  margin: 5px;
  text-align: center;
  color: #FFFFFF;
  user-select: none;
  cursor: pointer;
}

.inactive {
  border-color: lightgray;
  color: lightgray;
  cursor: not-allowed;
}
</style>
