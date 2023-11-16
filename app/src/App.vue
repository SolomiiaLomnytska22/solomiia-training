<template>
  <div id="app">
    <PageHeader :userInfo="userInfo" :menuItems="menuItems" />
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from './components/header/Header.vue';
export default {
  name: 'App',
  components:{
    PageHeader
  },
  data() {
    return {
      userInfo: {
        name: 'John Doe',
        avatar: 'Man.jpg',
      },
      menuItems: [
        { id: 1, route: '/', caption: 'Home' },
        { id: 2, route: '/about', caption: 'About' },
        { id: 3, route: '/contact', caption: 'Contact' },
      ],
    };
  },
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}

</style>
