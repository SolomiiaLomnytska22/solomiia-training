<template>
    <div class="menu-content">
      <router-link v-for="(item) in menuItems" :to="item.route" :key="item.id">
        <h3>{{ item.caption }}</h3>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      menuItems: Array,
    },
  };
  </script>