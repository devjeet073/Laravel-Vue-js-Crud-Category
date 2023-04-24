<script setup></script>

<template>
  <div>

    <h1 class="text-5xl font-bold">Edit Category</h1>

    <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">Back</router-link>
    <div class="bg-gray-100 p-6">
      <form class="bg-white rounded-lg overflow-hidden shadow-md p-8" @submit.prevent="updateCategory">
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
    name: "List Category",
    data() {
        return {
            category: {},
            categoryId:null,
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
            toast: useToast()
        }
    },
    created() {
        this.fetchCategory()
    },
    methods: {
        fetchCategory(){
          const categoryId = this.$route.params.id
            fetch('http://backend.local/api/categories/'+categoryId,{
              headers: {
                'Authorization': `Bearer ${this.authtoken}`
              }
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                  this.category=data.data.categories
                }
                else{
                  toast.error("Something went wrong", this.toastoptions);
                }
            })
            .catch(error => {
                console.error(error)
            })
        },
        updateCategory(){
          const categoryId = this.$route.params.id
            fetch('http://backend.local/api/categories/'+categoryId,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name:this.category.name,
                    _method: 'PUT'
                })
            })
            .then(response => response.json())
            .then(data => {
              if(data.success){
                this.toast.success('Category updated successfully.',this.toastoptions)
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
