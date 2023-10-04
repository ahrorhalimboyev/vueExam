import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { createPinia } from "pinia";
import validation from "@/plugins/vee-validate";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(store)
  .use(validation)
  .use(createPinia())
  .use(router)
  .mount("#app");
