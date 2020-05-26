<template>
  <div class="enter-name-container">
      <div class="fridge-circle">
        <p id="the">the</p>
        <h1>Fridge</h1>
        <p id="end">The End of empty Fridges</p>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EnterFridgeName extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.fridge-circle {
    background-color: #0F7195;
    width: 320px;
    height: 320px;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border: 15px solid rgba(255, 235, 180, 0.56);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;

    h1 {
        font-size: 80px;
        margin: 0;
    }
    p{
        margin: 0;

        #the {
            font-size: 25px;
        }
        #end {
            position: relative;
            right: 98px;
            top: 30px;
            font-size: 24px;
            color: rgba(255, 255, 255, 0.65)

        }
    }
}
</style>
