<template>
  <div>
    <div>
      Here comes the list with all the available items
    </div>
    <AddItemButton />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddItemButton from '@/components/AddItemButton.vue';

@Component({
  components: {
    AddItemButton,
  },
})
export default class Inventory extends Vue {

}
</script>
