<script>
export default {
  props: {
    markdownContent: {
      type: String,
      required: true,
    },
  },
  setup(_,context) {
    async function updateContent(event) {
      context.emit("update:markdownContent", event.target.value)
    }
    return {
      updateContent,
    };
  },
};
</script>
<template>
  <div class="editor">
    <textarea :value="markdownContent" @input="updateContent" />
  </div>
</template>
<style scoped>
.editor {
  border: 1px solid black;
  border-radius: 10px;
  width: 48%;
  height: 80vh;
  overflow: auto
}
.editor textarea {
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
}
</style>