<template>
<div>

    <h1 class="text-5xl font-bold">List Category</h1>
    <div class="flex justify-end">
        <router-link to="/add" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</router-link>
    </div>
    <div class="flex justify-end">
        <label class="block my-8">
            <span class="block text-sm font-medium text-slate-700">Search</span>
            <input type="text" v-model="search" class="w-64 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500" autofocus/>
        </label>

    </div>


    <div class="flex justify-center clear-right">

        
        <div class="table w-full">
            <div class="table-row-group">
                <div class="table-row bg-gray-200 font-bold">
                    <div class="table-cell p-2">Name</div>
                    <div class="table-cell p-2">Action</div>
                </div>
                <div v-if="loading" class="animate-pulse text-center w-full">Loading...</div>
                <div v-else class="table-row my-8" v-for="singlecategory in category" :key="singlecategory.id">
                    <div class="table-cell p-2">{{ singlecategory.name }}</div>
                    <div>
                        <button class="bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editCategory(singlecategory.id)">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteCategory(singlecategory.id)">Delete</button>
                    </div>
                </div>
                <nav class="flex">
                    <ul class="flex gap-20">
                        <li v-for="pageNumber in totalPages" :key="pageNumber">
                            <!-- <router-link :to="{ path: '/categories', query: { page: pageNumber } }">{{ pageNumber }}</router-link> -->
                            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="fetchCategory(pageNumber)">{{ pageNumber }}</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
    name: "List Category",
    data() {
        return {
            loading:false,
            category: [],
            search:"",
            totalPages: 0,
            currentPage: 1,
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
    mounted() {
        this.fetchCategory()
    },
    watch:{
        search:function (newvalue,oldvalue){
            this.fetchCategory();
        }
    },
    methods: {
        fetchCategory(pageNumber=1){
            this.loading = true;
            const page = pageNumber || 1
            fetch(`http://backend.local/api/categories`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authtoken}`
                },
                body:JSON.stringify({
                    page:page,
                    search:this.search
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    this.category=data.data.categories.data
                    this.totalPages = data.data.categories.last_page
                    this.currentPage = parseInt(page)
                    this.loading = false
                }
                else{
                    toast.error("Something went wrong", this.toastoptions);
                }
            })
            .catch(error => {
                console.error(error)
                this.loading = false
            })
        },
        deleteCategory(id=""){
            if(id==""){
                return false;
            }
            fetch('http://backend.local/api/categories/'+id,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.authtoken}`
                },
            })
            .then(response => response.json())
            .then(data => {
                this.toast.success('Category deleted successfully.',this.toastoptions)
                this.fetchCategory()
            })
            .catch(error => {
                console.error(error)
            })
        },
        editCategory(id=""){
            if(id==""){
                return false;
            }
            this.$router.push('/edit/'+id)
        }
    }
}
</script>

<style scoped>


    

</style>
