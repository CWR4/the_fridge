<template>
    <!-- eslint-disable max-len -->
    <div class="enter-name-container">
        <div class="fridge-circle">
            <p id="the">the</p>
            <h1>Fridge</h1>
            <p id="end">The End of empty Fridges</p>
        </div>
        <input type="text"
        class="form-control fridge-name-input"
        placeholder="FRIDGE NAME"
        v-model="fridgeName"
        @keydown.space.prevent
        required>
        <p v-if="isFridgeExistent">Please choose another name</p>
        <p v-if="isErrorThrown">Sorry, please try again</p>
        <p v-if="isWhiteSpaceInInput">No whitespace allowed</p>
        <button type="button" v-on:click="createNewFridge" class="btn btn-primary standard-fridge-button">NEW FRIDGE</button>
        <button type="button" v-on:click="openFridge" class="btn btn-primary standard-fridge-button">OPEN FRIDGE</button>
    </div>
</template>

<script>
import axios from 'axios';
// TODO: Set cookie
export default {
  name: 'EnterFridgeName',
  data: () => ({
    isFridgeExistent: false,
    isErrorThrown: false,
    isWhiteSpaceInInput: false,
    fridgeName: '',
    fridgeNames: [],
  }),
  mounted() {
    axios.get('http://localhost:8000/api/getFridges').then((fridges) => {
      fridges.data.forEach((fridge) => {
        this.fridgeNames.push(fridge.name);
      });
    });
  },
  methods: {
    /** checks input for white space, returns true if true, false if false */
    checkOnWhiteSpaceInInput(inputForSpaceTest) {
      this.isWhiteSpaceInInput = /\s/g.test(inputForSpaceTest);
      this.isFridgeExistent = false;
      this.isErrorThrown = false;
      return this.isWhiteSpaceInInput;
    },
    /** checks if entered fridge name is already in use */
    checkIfFridgeIsExistent(chosenFridgeName) {
      this.isFridgeExistent = this.fridgeNames.find((element) => element === chosenFridgeName);
      this.isWhiteSpaceInInput = false;
      this.isErrorThrown = false;
      return this.isFridgeExistent;
    },
    /** Creates new fridge, sets cookie with fridge name and redirects to next page */
    createNewFridge() {
      if (!this.checkOnWhiteSpaceInInput(this.fridgeName)
      && !this.checkIfFridgeIsExistent(this.fridgeName)) {
        axios({
          method: 'post',
          url: 'http://localhost:8000/api/createFridge',
          data: {
            name: this.fridgeName,
          },
        }).then((result) => {
          if (result.status === 200) {
            document.cookie = `fridge=${this.fridgeName}`;
            this.$router.push({ path: '/about' });
          }
        }).catch((error) => {
          this.isErrorThrown = true;
          console.log(error);
        });
      } else {
        this.fridgeName = '';
      }
    },
    openFridge() {
      console.log(this.fridgeName);
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

p {
  color: white;
}

.fridge-circle {
    background-color: #0F7195;
    width: 320px;
    height: 320px;
    margin-top: 10%;
    margin-right: auto;
    margin-bottom: 35px;
    margin-left: auto;
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

.fridge-name-input {
    display: block;
    margin: 10px auto;
    width: 150px;
    border-radius: 0.26rem;
    border: 1px solid #2A9FD6;

    &::placeholder {
        color: rgba(0, 0, 0, 0.247);
    }
}

.standard-fridge-button {
    color: white;
    background-color: #0F7195;
    transition: .3s ease-in-out;
    display: block;
    margin: 10px auto;
    width: 150px;

    &:hover {
        background-color: white;
        color: #0F7195;
        transition: .3s ease-in-out;
    }
}
</style>
