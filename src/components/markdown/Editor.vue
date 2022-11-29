<script>
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup(props, context) {
    const route = useRoute();
    const markdownInfo = ref({});
    const docID = ref("");
    async function getMarkdownDetails() {
      const q = query(
        collection(db, "markdowns"),
        where("id", "==", route.params.id)
      );
      const markdown = await getDocs(q);
      markdown.forEach((doc) => {
        docID.value = doc.id;
        markdownInfo.value = doc.data().content;
      });
      context.emit("updatedData", markdownInfo.value);
    }
    async function updateContent() {
      const markdownRef = doc(db, "markdowns", docID.value);
      await updateDoc(markdownRef, {
        content: markdownInfo.value,
      });
      context.emit("updatedData", markdownInfo.value);
    }
    getMarkdownDetails();
    return {
      markdownInfo,
      updateContent,
    };
  },
};
</script>
<template>
  <div class="editor">
    <textarea v-model="markdownInfo" @input="updateContent" />
  </div>
</template>
<style scoped>
.editor {
  border: 1px solid black;
  border-radius: 10px;
  height: 200px;
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