<template>
  <div class="w-screen h-full relative">
    <div class="fixed top-0 bottom-0 w-[281px] border-r border-gray-200 bg-white z-10">
      <Sidebar />
    </div>
    <div class="bg-layout pl-[281px] min-h-screen z-0">
      <div class="pt-[26px] pl-9 pb-[13px] border-b border-gray-200 bg-white">
        <div class="font-semibold text-[17px] text-black-300">Conversion</div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
</script>
