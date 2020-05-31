<template>
  <div class="add-button" style="align-content: center" v-on:click="addItem()">
    +
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AddItemButton extends Vue {
  addItem(): void {
    console.log(this.$route.name, 'Add item');
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

  position: fixed;
  bottom: 5px;
  z-index: 1;
  display: inline-block;
  transform: translate(-50%, -50%);
}

.add-button:hover {
  cursor: pointer;
}

.add-button:active {
  box-shadow: 0 0 5px 2px #0F7195;
}

</style>
