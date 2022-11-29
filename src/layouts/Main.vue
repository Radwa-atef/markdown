<script>
export default {

}
</script>
<template>
  <div class="header">
    <router-link to="/">
      <img alt="Vue logo" src="../assets/markdown.png" width="50">
    </router-link>
  </div>
  <slot/>
  <div class="footer">
    <img alt="Vue logo" src="../assets/githubM.png" width="30">
  </div>
</template>
<style>
.header{
  text-align: center;
  background-color: black;
}
.footer{
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: black;
}
img{
  background-color: white;
  transform: translate(50%);

}
</style>