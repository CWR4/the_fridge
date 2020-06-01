<template>
  <div class="item-container">
      <p class="item-name">{{ name }}</p>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Item',
  props: {
    name: String,
  },
};
</script>

<style scoped lang="scss">

.item-container {
    background-color: rgb(224, 224, 224);
    max-width: 350px;
    max-height: 150px;
    margin-left: auto;
    margin-right: auto;
}
</style>
