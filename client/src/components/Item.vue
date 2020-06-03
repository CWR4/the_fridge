<template>
  <div class="container item-container">
    <div class="row">
      <div class="col-1" v-if="hasCheckbox">
        <input type="checkbox" v-model="isChecked" @click="moveItemToFridge">
      </div>
      <div class="col item-name text-left"
        :class="{ checked: isChecked }"
      >
        {{ item.name }}
      </div>
      <div class="col-2" v-if="!hasCheckbox">x{{ item.amount }}</div>
      <div class="col-2" v-if="hasCheckbox">x{{ item.amount_to_buy }}</div>
      <div class="col-2" @click="showOptions = !showOptions">
        <img src="../assets/chevron-down.png" v-if="!showOptions" />
        <img src="../assets/chevron-up.png" v-if="showOptions" />
      </div>
    </div>
    <div class="has-padding" v-show="showOptions">
      <div class="row">
        <div class="col-10 text-center">
          <span class="amount-box"
          @click="decreaseAmount()"
          :class="{ inactive: (item.amount <= 0 && !hasCheckbox) }">
            -
          </span>
          <span class="amount-box" v-if="!hasCheckbox">
            {{ item.amount }}
          </span>
          <span class="amount-box" v-else>
            {{ item.amount_to_buy }}
          </span>
          <span class="amount-box"
            @click="increaseAmount()"
          >
            +
          </span>
        </div>
        <div class="col-2">
          <img src="../assets/trash.png"
          @click="deleteItem()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Inject,
} from 'vue-property-decorator';
import { ItemType } from '../interfaces';

@Component({})
export default class Item extends Vue {
  @Prop() hasCheckbox!: boolean;

  @Prop() item!: ItemType;

  @Inject() axios: any;

  @Inject() eventBus: any;

  showOptions = false;

  isChecked = false;

  deleteItem(): void {
    if (!this.hasCheckbox) {
      this.item.amount = 0;
    } else {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.item.amount_to_buy = 0;
    }
    this.updateProduct();
  }

  increaseAmount(): void {
    if (!this.hasCheckbox) {
      this.item.amount += 1;
    } else {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.item.amount_to_buy += 1;
    }
    this.updateProduct();
  }

  decreaseAmount(): void {
    if (!this.hasCheckbox && this.item.amount > 0) {
      this.item.amount -= 1;
    } else if (this.item.amount_to_buy > 0) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.item.amount_to_buy -= 1;
    }
    this.updateProduct();
  }

  moveItemToFridge(): void {
    this.item.amount += this.item.amount_to_buy;
    this.item.purchased = true;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.item.amount_to_buy = 0;
    this.updateProduct();
  }

  updateProduct(): void {
    this.axios.post(
      'http://localhost:8000/api/upsertproduct',
      {
        product: this.item,
        fridgeName: localStorage.getItem('userFridge'),
      },
    ).then((result: any) => {
      this.eventBus.$emit('update');
    });
  }
}
</script>

<style scoped lang="scss">

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

.amount-box {
  min-width: 22px !important;
  padding: 0 4px;
  min-height: 22px !important;
  margin: 5px;
  border: 1px #404144 solid;
  border-radius: 3px;
  user-select: none;
}

.has-padding {
  padding-bottom: 10px;
}

.inactive {
  border-color: lightgray;
  color: lightgray;
  cursor: not-allowed;
}

.checked {
  text-decoration: line-through;
}
</style>
