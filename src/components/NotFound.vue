<template>
<!-- Page Container -->
<div class="flex items-center justify-center min-h-full bg-white py-10">
    <div class="flex flex-col">
        <!-- Notes -->
        <span class="text-center font-bold my-10 opacity-30">
            <button @click="previouspage()" class="text-blue-600">
                Go back
            </button>
        </span>
        <!-- Error Container -->
        <div class="flex flex-col items-center">
            <div class="text-indigo-500 font-bold text-7xl">
                404
            </div>
            <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                This page does not exist
            </div>
            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                The page you are looking for could not be found.
            </div>
        </div>
    </div>
</div>
</template>


<script>
export default {
  data() {
    return {
    };
  },
  mounted() {},
  methods: {
    previouspage() {
      this.$router.go(-1);
    },
  },
};
</script>
