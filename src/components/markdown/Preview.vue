
<script>
import { ref, watch, computed } from "vue";
import  rules  from "./rules.js";
export default {
  props: {
    previewData: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const htmlText = ref("");
    watch(
      () => props.previewData,
      () => {
        // console.log(selection)
        // console.log(prevSelection)
        parseMarkdown();
      }
    );

    const rulesData = computed(() => {
      return rules;
    });
    console.log(rulesData.value);
    function parseMarkdown() {
       htmlText.value = props.previewData
        .replace(/^###### (.*$)/gim, "<h6>$1</h6>")
        .replace(/^##### (.*$)/gim, "<h5>$1</h5>")
        .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*)\*/gim, "<i>$1</i>")
        .replace(/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,'<img src="$2" alt="$1" title="$3" />')
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$3</li></ul>")
        .replace(/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$3</li></ul>")
        .replace(/^(\s*)(\d+\.\s+)(.*)/gm, "<ol>$1</ol>")
        .replace(/\n$/gim, "<br />");
    }

    // function parseMarkdown() {
    //   rulesData.value.forEach(([rule, template]) => {
    //     const found = props.previewData.match(rule)
    //     console.log(found)
    //     if(found)
    //     {
    //       htmlText.value +=props.previewData.replace(rule, template)
    //     }
    //     })
    // }
    parseMarkdown();
    return {
      htmlText,
    };
  },
};
</script>
<template>
  <div class="preview" v-html="htmlText"></div>
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