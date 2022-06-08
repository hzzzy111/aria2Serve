import Vue from "vue";
import VueRouter from "vue-router";
import Downloading from "../views/Downloading.vue";
import NextTack from "../views/NextTack.vue"
import TaskInfo from "../views/TaskInfo.vue"
import Serves from "../views/Serves.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Downloading",
    component: Downloading,
  },
  {
    path: "/completed",
    name: "Completed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Completed.vue"),
  },
  {
    path: "/nexttack",
    name: "NextTack",
    component: NextTack
  },
  {
    path: "/taskinfo/:gid",
    name: 'TaskInfo',
    component: TaskInfo
  },
  {
    path: "/setting",
    name: "Setting",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Setting.vue"),
  },
  {
    path: "/serves",
    name: "Serves",
    component: Serves
  }
];

const router = new VueRouter({
  routes,
});

export default router;
