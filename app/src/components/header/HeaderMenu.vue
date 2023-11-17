<template>
    <div class="menu-content">
      <router-link v-for="(item) in menuItems" :to="item.route" :key="item.id">
        <h3>{{ item.title }}</h3>
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

  <style scoped>
  .menu-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 15%;
    height: 90vh;
    background-color: rgba(51, 51, 51, 0.9);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px 5%;
    z-index: 1;
    position: fixed;
  }
  
  .menu-content a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
   
  }
  
  .menu-content a:hover {
    color: #4caf50;
  }

  @media only screen and (max-width: 786px) {
    .menu-content {
      width: 100%;
    }
  }
  </style>