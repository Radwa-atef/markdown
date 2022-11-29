<script>
import Layout from "./layouts/Main.vue";
export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>
<template>
  <div>
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
