import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCarousel from "vue-carousel";
import StarRating from 'vue-star-rating'

Vue.component('star-rating', StarRating);
Vue.use(VueCarousel);

import "@/assets/scss/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
