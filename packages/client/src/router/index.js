import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Like from "../views/Like.vue";
import Creds from "../views/Creds.vue";
import Cred from "../views/Cred.vue";
import Proxy from "../views/Proxy.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/creds",
    name: "creds",
    component: Creds
  },
  {
    path: "/creds/:id",
    name: "cred",
    component: Cred
  },
  {
    path: "/likes/:id",
    name: "like",
    component: Like
  },
  {
    path: "/proxy",
    name: "proxy",
    component: Proxy
  }
];

const router = new VueRouter({
  routes
});

export default router;
