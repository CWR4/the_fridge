<template>
    <!-- eslint-disable max-len -->
    <div class="item-container">
        {{ name }}
        <br>
        Noch da: {{ amount }}
        <br>
        Gekauft (0 = nein, 1 = ja): {{ purchased }}
        <br>
        Zu kaufende Menge: {{ amountToBuy }}
        <br>
    </div>
</template>

<script>
module.exports = {
  props: [
    'name',
    'amount',
    'purchased',
    'amountToBuy',
  ],
};
// export default {
//   name: 'Item',
//   data: () => ({
//   }),
//   mounted() {
//   },
//   methods: {
//   },
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
