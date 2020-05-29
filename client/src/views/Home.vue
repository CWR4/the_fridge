<template>
    <!-- eslint-disable max-len -->
    <div class="home-container">
      <h1 id="fridgeName">Welcome to your {{ fridgeName }}</h1>
    </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    fridgeName: '',
  }),
  mounted() {
    this.fridgeName = localStorage.getItem('userFride');
  },
  // methods: {
  // },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
