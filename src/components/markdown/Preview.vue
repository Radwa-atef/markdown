
<script>
export default {
  props: {
    markdownContent: {
      type: String,
      required: true,
    },
  },
};
</script>
<template>
  <div class="preview" v-markdown='markdownContent'></div>
</template>
<style scoped>
.preview {
  border: 1px solid #a5abb3;
  border-radius: 10px;
  width: 48%;
  height: 80vh;
  overflow: auto;
  padding: 10px;
}
</style>