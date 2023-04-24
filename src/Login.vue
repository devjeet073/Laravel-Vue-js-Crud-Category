<template>
  <div>
    <h1 class="text-5xl font-bold text-center">Login</h1>

    <div class="bg-gray-100 p-6">
      <form
        class="bg-white rounded-lg overflow-hidden shadow-md p-8"
        @submit.prevent="login"
      >
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Enter Email"
            v-model="user.email"
            autofocus
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter Password"
            v-model="user.password"
          />
        </div>
        <div class="">
          <button
            class="bg-blue-500 mb-4 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <router-link
            to="/register"
            class="text-blue-500 hover:text-blue-700 transition duration-300 ease-in"
            >Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      toastoptions: {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      const toast = useToast();
      fetch("http://backend.local/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.user.email,
          password: this.user.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.success){
              toast.success("Login successfully.", this.toastoptions);
              localStorage.setItem("auth-token",data.data.token);
              this.$router.push('/');
            }
            else{
              toast.error("Login failed. please enter valid credentials", this.toastoptions);
            }
          // this.$toasted.success('Form submitted successfully')
          // this.category=data.data.categories;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
