import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import(/* webpackChunkName: "HomePage" */ "../views/Index.vue"),
    meta: {
      title: "homePage",
    },

  },
  {
    path: "/markdown/:id",
    name: "Markdown",
    component: () => import(/* webpackChunkName: "Markdown" */ "../views/MarkDown.vue"),
    meta: {
      title: "markdown",
    },

  },
]
const router = createRouter({ history: createWebHistory(), routes })
export default router