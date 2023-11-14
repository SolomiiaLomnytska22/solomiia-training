<template>
    <header class="app-header">
      <div class="left">
        <div class="burger-menu" @click="handleToggle">
          <img v-if="!showMenu" src="../../assets/menu.svg" alt="MenuIcon">
          <img v-else src="../../assets/cross.svg" alt="CloseIcon">
        </div>
      </div>
      <div class="right">
        <div class="user-info">
          <span>{{ userInfo.name }}</span>
          <img :src="userInfo.avatar" alt="User Avatar" />
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    props: {
        showMenu: Boolean,
        userInfo: Object
    },
    methods: {
      handleToggle() {
        this.$emit('toggle');
      },
    },
  };
  </script>
  