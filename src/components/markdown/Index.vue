<script>
import Editor from "./Editor.vue";
import Preview from "./Preview.vue";
import { ref } from "vue";

export default {
  setup() {
    const previewData = ref("");
    function updatedData(val) {
      previewData.value = val;
    }
    return {
      previewData,
      updatedData,
    };
  },
  components: {
    Editor,
    Preview,
  },
};
</script>
<template>
  <div class="markdown">
    <Editor @updatedData="updatedData" />
    <Preview :preview-data="previewData" />
  </div>
</template>
<style>
.markdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
</style>