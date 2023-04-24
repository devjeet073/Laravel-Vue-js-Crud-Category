import List from "./components/List.vue";
import Add from "./components/Add.vue";
import Edit from "./components/Edit.vue";
import NotFound from "./components/NotFound.vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

const routes = [
  {
    path: "/login",
    component: Login,
    name: 'login',
    meta: { title: "Login", requiresAuth: false },
  },
  {
    path: "/register",
    component: Register,
    name: 'register',
    meta: { title: "Register", requiresAuth: false },
  },
  {
    path: "/",
    onlyWhenLoggedOut: false,
    component: List,
    name: 'categorylist',
    meta: { title: "List Category", requiresAuth: true },
  },
  {
    path: "/add",
    component: Add,
    name: 'addcategory',
    meta: { title: "Add Category", requiresAuth: true },
  },
  {
    path: "/edit/:id",
    component: Edit,
    name: 'editcategory',
    meta: { title: "Edit Category", requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    name: "404",
    meta: { title: "404 Not Found", requiresAuth: false},
  },
  // your other routes here
];
export default routes;
