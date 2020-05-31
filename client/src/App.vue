<template>
  <div id="app">
    <SecondLevelMenue v-if="$route.name !== 'home'"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SecondLevelMenue from './components/SecondLevelMenue.vue';

@Component({
  components: {
    SecondLevelMenue,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">

body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #1894D6;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
