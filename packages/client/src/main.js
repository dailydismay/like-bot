import Vue from "vue";
import moment from "moment";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";

import "@vuikit/theme";

Vue.use(Vuikit);
Vue.use(VuikitIcons);

Vue.config.productionTip = false;

Vue.filter("toDate", value => moment(value).format("DD MMMM YY / HH:MM"));

Vue.filter("toDateFromNow", value => moment(value).fromNow());

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount("#app");
