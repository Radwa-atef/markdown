<script>
import { db } from "@/config/firebase";
import { collection, getDocs,query,orderBy } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// const route = useRoute()
export default {
  setup() {
    const router = useRouter();
    const markdownsData = ref([]);
    function goToDetails(id) {
      router.push({name:"Markdown",params:{id}});
    }
    function formatDate(val)
    {
      const date = new Date(val.seconds* 1000)
      return date.toLocaleString()
    }
    async function getAllMarkdowns() {
      const q = query(collection(db, "markdowns"), orderBy("createdAt", "asc"));
      const markdowns = await getDocs(q)
      markdowns.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        markdownsData.value.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
    }
    onMounted(()=>{
      getAllMarkdowns()
    })
    return {
      markdownsData,
      goToDetails,
      formatDate,
      getAllMarkdowns
    };
  },
};
</script>
<template>
  <div class="home-page">
    <h1>Welcome to markdown</h1>
    <div class="card">
      <div v-for="(item, index) in markdownsData" :key="item.id">
        <div class="card-content" @click="goToDetails(item.id)">
          <div class="card-number">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="created-at">
            <span>{{ formatDate(item.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.home-page {
  margin-top: 30px;
  text-align: center;
}
.card {
  display: flex;
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
.card-content:hover {
  opacity: 1;
}
.name {
  margin-top: 20px;
  font-weight: 600;
}
.created-at {
  font-size: 14px;
}
</style>