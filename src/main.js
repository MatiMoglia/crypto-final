import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toastify from 'vue3-toastify';
import "vue3-toastify/dist/index.css"; 
import "aos/dist/aos.css";
import "../src/assets/css/styles.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Toastify, {
  position: "top-right", 
  timeout: 3000,       
  closeOnClick: true,   
  pauseOnHover: true,   
});
app.use(VueSweetalert2);

app.mount('#app');