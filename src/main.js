import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/main.css";

import { init } from "./store/api";

Vue.config.productionTip = false;

init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch("users/checkUserAuthorized")]).then(next)
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
