<template>
  <main class="container mt-10">
    <button v-if="this.$route.name!='404'"
      type="button"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
      @click="logout()"
    >
      Logout
    </button>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
<script>
import { useToast } from "vue-toastification";
export default {
  data(){
    return{
      authtoken:localStorage.getItem("auth-token"),
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
      }
    }
  },
  methods: {
    logout() {
      const toast = useToast();
      fetch("http://backend.local/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${this.authtoken}`
        },
        body: JSON.stringify({
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.success){
                toast.success("Logout successfully.", this.toastoptions);
                this.$router.push('/login');
                localStorage.removeItem('auth-token');
            }
            else{
                toast.error("Loout failed", this.toastoptions);
            }
          // this.$toasted.success('Form submitted successfully')
          // this.category=data.data.categories;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

}
</script>
