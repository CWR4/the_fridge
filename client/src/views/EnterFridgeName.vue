<template>
    <div class="enter-name-container">
        <div class="fridge-circle">
            <p id="the">the</p>
            <h1>Fridge</h1>
            <p id="end">The End of empty Fridges</p>
        </div>
        <button type="button" class="btn btn-primary standard-fridge-button">NEW FRIDGE</button>
        <button type="button" class="btn btn-primary standard-fridge-button">OPEN FRIDGE</button>
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
    margin-top: 10%;
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
    p {
        margin: 0;
    }
    #the {
        position: relative;
        right: 94px;
        top: 24px;
        font-size: 24px;
    }
    #end {
        color: rgba(255, 255, 255, 0.65)
    }
}

.standard-fridge-button {
    color: white;
    background-color: #0F7195;
    transition: .3s ease-in-out;
    display: block;
    margin: 10px auto;
    min-width: 150px;

    &:hover {
        background-color: white;
        color: #0F7195;
        transition: .3s ease-in-out;
    }
}
</style>
