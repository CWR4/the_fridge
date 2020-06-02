<template>
  <div class="container item-container">
    <div class="row">
      <div class="col item-name text-left">{{ item.name }}</div>
      <div class="col-2">{{ item.amount }}x</div>
      <div class="col-2" @click="showOptions = !showOptions">
        <img src="../assets/chevron-down.png" v-if="!showOptions" />
        <img src="../assets/chevron-up.png" v-if="showOptions" />
      </div>
    </div>
    <div class="row has-padding" v-show="showOptions">
      <div class="col-10 text-center">
        <span class="amount-box"
        @click="decreaseAmount()">
          -
        </span>
        <span class="amount-box">
          {{ item.amount }}
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ItemType } from '../interfaces';

@Component({})
export default class Item extends Vue {
  @Prop() name!: string;

  @Prop() item!: ItemType;

  showOptions = false;

  deleteItem(): void {
    console.log('Delete Item', this.showOptions);
  }

  increaseAmount(): void {
    console.log('Todo: send action to backend');
    this.item.amount += 1;
  }

  decreaseAmount(): void {
    console.log('Todo: send action to backend');
    this.item.amount -= 1;
  }
}
</script>

<style scoped lang="scss">

.item-container {
  background-color: rgb(224, 224, 224);
  width: 90%;
  max-width: 350px;
  max-height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 3px;

  font-size: 18px;
}

.amount-box {
  min-width: 22px !important;
  padding: 0 4px;
  min-height: 22px !important;
  margin: 5px;
  border: 1px #404144 solid;
  border-radius: 3px;
}

.has-padding {
  padding-bottom: 10px;
}
</style>
