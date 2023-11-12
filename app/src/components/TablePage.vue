<template>
  <div>
    <header class="app-header">
      <div class="left">

        <div class="burger-menu" @click="toggleMenu">
          <img v-if="!showMenu" src="../assets/menu.svg" alt="MenuIcon">
          <img v-else src="../assets/cross.svg" alt="CloseIcon">
        </div>
      </div>
      <div class="right">
 
        <div class="user-info">
          <span>{{ userInfo.name }}</span>
          <img :src="userInfo.avatar" alt="User Avatar" />
        </div>
      </div>
    </header>
    <div v-show="showMenu" class="menu-content">

      <router-link to="/"><h3>Home</h3></router-link>
      <router-link to="/about"><h3>About</h3></router-link>
      <router-link to="/contact"><h3>Contact</h3></router-link>
    </div>
    <UserTableVue/>
  </div>
</template>

<script>
import UserTableVue from './UserTable.vue';

export default {
  components: {
    UserTableVue,
  },
  data() {
    return {
      showMenu: false,
      userInfo: {
        name: 'John Doe',
        avatar: 'Man.jpg',
      },
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

