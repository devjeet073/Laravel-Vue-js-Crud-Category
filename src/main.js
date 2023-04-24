import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./Route";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { TokenService } from "./services/storage.service";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.requiresAuth)) {
//     // If route requires authentication, check if user is authenticated
//     if (to.matched.some(route => route.meta.requiresAuth)) {
//       // If route requires authentication, check if user is authenticated
//       const isAuthenticated = !!TokenService.getToken();// ...check authentication logic here...;
  
//       if (!isAuthenticated) {
//         // If user is not authenticated, redirect to login page
//         next('/login');
//       } else {
//         // If user is authenticated, allow access to the protected route
//         next();
//       }
//     } else {
//       // If route does not require authentication, allow access
//       next();
//     }
//   }
// });

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  shareAppContext: true,
};

const app = createApp(App);
app.use(Toast, options);
app.use(router);
app.mount("#app");
