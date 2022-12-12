<script>
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  Timestamp,
  limit,
  startAfter,
} from "firebase/firestore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";

// const route = useRoute()
export default {
  setup() {
    const router = useRouter();
    const markdownsData = ref(new Set());
    const lastVisible = ref({});
    const pageLimit = ref(20);
    function goToDetails(id) {
      router.push({ name: "Markdown", params: { id } });
    }
    function formatDate(val) {
      const date = new Date(val.seconds * 1000);
      return date.toLocaleString();
    }
    async function getAllMarkdowns() {
      const q = Object.keys(lastVisible.value).length
        ? query(
            collection(db, "markdowns"),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible.value),
            limit(pageLimit.value)
          )
        : query(
            collection(db, "markdowns"),
            orderBy("createdAt", "desc"),
            limit(pageLimit.value)
          );
      const markdowns = await getDocs(q);

      // Get the last visible document
      lastVisible.value = markdowns.docs[markdowns.docs.length - 1];
      markdowns.forEach((doc) => {
        markdownsData.value.add(doc.data());
      });
    }
    function showMore() {
      pageLimit.value += 10;
      getAllMarkdowns();
    }
    async function addNewDoc() {
      const id = uuidv4();
      await addDoc(collection(db, "markdowns"), {
        id,
        title: "",
        content:"# welcome to markdowns ###please check the default markdowns",
        createdAt: Timestamp.fromDate(new Date()),
      });
      router.push({ name: "Markdown", params: { id } });
    }
    onMounted(() => {
      getAllMarkdowns();
    });
    return {
      markdownsData,
      goToDetails,
      formatDate,
      getAllMarkdowns,
      addNewDoc,
      showMore,
      lastVisible
    };
  },
};
</script>
<template>
  <div class="home-page">
    <h1>Welcome to markdown</h1>

    <div class="card">
      <div class="add-new">
        <div @click="addNewDoc">
          <img src="@/assets/addNew.png" width="50" />
          <div class="card-title">Add new</div>
        </div>
      </div>
      <div v-for="(item, index) in markdownsData" :key="item.id">
        <div class="card-content" @click="goToDetails(item.id)">
          <div class="card-number">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="card-title">
            <span>{{ item.title || "No title" }}</span>
          </div>
          <div class="created-at">
            <span>{{ formatDate(item.createdAt) }}</span>
          </div>
        </div>
      </div>

    </div>
    <button v-if="lastVisible" class="show-more" @click="showMore">show more</button>
  </div>
</template>
<style  scoped>
.home-page {
  margin-top: 30px;
  text-align: center;
  width: 75%;
  margin: 20px auto auto auto;
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  cursor: pointer;
}

.card-number {
  text-align: left;
}
.card-number span {
  background-color: black;
  color: white;
  border-radius: 8px;
  padding: 5px 9px;
  font-weight: 600;
}
.card-content {
  background-color: #f4f6f9;
  border-radius: 20px;
  min-width: 200px;
  min-height: 150px;
  padding: 20px;
  opacity: 0.7;
  transition: 0.3s;
}
.add-new {
  background-color: #f4f6f9;
  border-radius: 20px;
  min-width: 120px;
  min-height: 150px;
  padding: 20px;
  opacity: 0.7;
  transition: 0.3s;
  display: flex;
  justify-content: center;
}
.card-content:hover,
.add-new:hover {
  opacity: 1;
}
.card-title {
  margin-top: 20px;
  font-weight: 600;
}
.created-at {
  font-size: 14px;
}
.show-more {
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: black;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
}
</style>