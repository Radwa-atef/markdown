
<script>
// import {vMarkdown} from '../../directives/vMarkdown';

export default {
  props: {
    previewData: {
      type: String,
      required: true,
    },
  },
//  directives: {"markdown": vMarkdown},
//  setup()
//  {
//   console.log(vMarkdown)
//   return{
//     vMarkdown
//   }
//  }
};
</script>
<template>
  <div class="preview" :key="previewData" v-markdown>{{previewData}}</div>
</template>
<style scoped>
.preview {
  border: 1px solid #a5abb3;
  border-radius: 10px;
  height: 200px;
  width: 48%;
  height: 80vh;
  overflow: auto;
  padding: 10px;
}
</style>