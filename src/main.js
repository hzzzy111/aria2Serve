import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Aria2Client from "./aria2-client"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI)

const aria2 = new Aria2Client({
  host: 'localhost',
  port: '6800',
  secert: '123456'
})
window.aria2 = aria2


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
