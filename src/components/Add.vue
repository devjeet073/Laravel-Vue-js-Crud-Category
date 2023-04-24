<template>
  <div>

    <h1 class="text-5xl font-bold">Add Category</h1>

    <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">Back</router-link>
    <div class="bg-gray-100 p-6">
      <form class="bg-white rounded-lg overflow-hidden shadow-md p-8" @submit.prevent="saveCategory">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Category Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="MI"
            v-model="category.name"
          />
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
    data() {
        return {
            category: {
                name:""
            },
            toastoptions : {
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
                rtl: false
            },
            authtoken:localStorage.getItem("auth-token"),
        }
    },
    mounted() {
    },
    methods: {
        saveCategory(){
            const toast = useToast()
            fetch('http://backend.local/api/categories/store',{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.authtoken}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name:this.category.name
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                  this.category.name="";
                  toast.success('Category added successfully.',this.toastoptions)
                }
                else{
                  toast.error("Something went wrong", this.toastoptions);
                }
            })
            .catch(error => {
                console.error(error)
            })
        }
    }
}
</script>

<style scoped></style>
