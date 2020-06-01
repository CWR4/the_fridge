<template>
  <div class="item-container">
      <p class="item-name">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class Item extends Vue {
    $props: {
        name: string;
        amount: number;
        purchased: boolean;
        amountToBuy: number;
    }
}
</script>

<style scoped lang="scss">

</style>
