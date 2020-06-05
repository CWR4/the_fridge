<template>
  <div class="menue-bar">
    <div class="menue-point" v-bind:class="{
      'is-active': isActive('inventory'),
      'is-inactive': !isActive('inventory')
    }">
      <router-link to="inventory" class="router-link">
        Inventory
      </router-link>
    </div>
    <div class="menue-point" v-bind:class="{
      'is-active': isActive('shopping-list'),
      'is-inactive': !isActive('shopping-list')
    }">
      <router-link to="shoppinglist" class="router-link">
        Shopping list
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class SecondLevelMenue extends Vue {
  /** provides boolean value to diplay border bottom on chosen directory
   * (inventory or shopping-list).
   * @param: chosen route; type: string
   * @returns: boolean
   */
  isActive(route: string): boolean {
    return route === this.$route.name;
  }
}

</script>

<style scoped lang="css">
.menue-bar {
  background-color: #158AB4;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-evenly;
  z-index: 10;
}

div {
  margin: 0;
}

.router-link {
  color: #FFFFFF;
  font-size: 15pt;
  font-weight: 500;
}

.is-inactive {
  opacity: 70%;
}

.is-active {
  border-bottom: #8190A5 solid;
}

.menue-point {
  width: 50%;
  align-content: center;
}

a:hover, a:visited, a:link, a:active {
  text-decoration: none;
}

</style>
