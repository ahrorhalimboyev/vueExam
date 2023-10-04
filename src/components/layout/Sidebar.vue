<template>
  <div class="sidebar">
    <router-link
      class="sidebar_link"
      active-class="sidebar_link_active"
      :to="item.path"
      v-for="(item, index) in items"
      :key="index"
      >{{ item.title }}</router-link
    >
  </div>
</template>

<script setup>
  const props = defineProps({
    items: {
      type: Array,
    },
  });
</script>

<style lang="scss" scoped>
  $color1: #000016;
  $color2: #fff;
  .sidebar {
    width: 100%;
    height: 100vh;
    background-color: $color1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sidebar_link {
    width: 100%;
    padding: 10px 15px;
    text-decoration: none;
    border-radius: 5px;
    background-color: $color2;
    color: $color1;
  }

  .sidebar_link_active {
    background-color: $color1;
    color: $color2;
    border: 2px solid $color2;
  }
</style>
