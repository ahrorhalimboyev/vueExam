<template>
  <div class="sidebar">
    <div class="sidebar-left">
      <Sidebar :items="sidebar_items" />
    </div>
    <div class="sidebar-right">
      <!-- <h1>Admin</h1> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
  import Sidebar from "@/components/layout/Sidebar.vue";
  import { ref } from "vue";
  const sidebar_items = ref([{ id: 1, title: "Products", path: "/products" }]);
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 100%;
    display: flex;
  }

  .sidebar-left {
    width: 300px;
    height: 100vh;
  }

  .sidebar-right {
    width: calc(100% - 300px);
    height: 100vh;
    overflow: auto;
  }
</style>
