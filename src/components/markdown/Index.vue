<script>
import Editor from "./Editor.vue";
import Preview from "./Preview.vue";
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const markdown = reactive({
      docID:"",
      title:"",
      content:""
    });

    async function getMarkdownDetails() {
      const q = query(
        collection(db, "markdowns"),
        where("id", "==", route.params.id)
      );
      const markdowns = await getDocs(q);
      markdowns.forEach((doc) => {
        markdown.docID = doc.id;
        markdown.title = doc.data().title;
        markdown.content = doc.data().content;
      });
    }
    async function updateData(data) {
      const markdownRef = doc(db, "markdowns", markdown.docID);
      await updateDoc(markdownRef, data);
    }
    function updateContent(val) {
      updateData({ content: val });
      markdown.content = val;
    }
    function updateTitle() {
      updateData({ title: markdown.title });
    }
    //  onBeforeUnmount(() => {
    //    updateData({ title: markdown.title, content: markdown.content });
    // });
    getMarkdownDetails();
    return {
      markdown,
      updateContent,
      updateTitle
    };
  },
  components: {
    Editor,
    Preview,
  },
};
</script>
<template>
  <div class="markdown-title">
    <label>Title </label>
    <input v-model="markdown.title" @input="updateTitle" />
  </div>
  <div class="markdown-content">
    <Editor
      :markdown-content="markdown.content"
      @update:markdownContent="updateContent"
    />
    <Preview :markdown-content="markdown.content" />
  </div>
</template>
<style>
.markdown-title {
  margin: 10px 20px;
}
.markdown-title label {
  font-weight: 600;
  margin-right: 10px;
}
.markdown-title input {
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  width: 40%;
}
.markdown-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
</style>