<template>
    <header class="app-header">
    
        <div class="burger-menu" @click="handleToggle">
          <img v-if="!showMenu" src="../../assets/menu.svg" alt="MenuIcon">
          <img v-else src="../../assets/cross.svg" alt="CloseIcon">
        </div>
      
        <div class="user-info">
          <span>{{ userInfo.name }}</span>
          <img :src="userInfo.avatar" alt="User Avatar" />
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

  <style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5%;
    background-color: #333;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .burger-menu {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .burger-menu img {
    width: 25px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  
  .user-info span {
    margin-right: 10px;
    font-size: medium;
  }
  
  .user-info span:hover {
    color: #4caf50;
    cursor: pointer;
  }
  
  .user-info img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
  
  
  </style>
  