<template>
  <div>
    <header>
      <div
        class="menu-icon"
        @click="handleToggle"
      >
        <img
          v-if="!showMenu"
          src="../../assets/menu.svg"
          alt="MenuIcon"
        >
        <img
          v-else
          src="../../assets/cross.svg"
          alt="CloseIcon"
        >
      </div>
      <div class="user-info">
        <span>{{ userInfo.name }}</span>
        <img
          :src="userInfo.avatar"
          alt="User Avatar"
        >
      </div>
    </header>
    <HeaderMenu
      v-if="showMenu"
      :menu-items="menuItems"
      @close="handleToggle"
    />
  </div>
</template>

<script lang="ts">
import HeaderMenu from './HeaderMenu.vue'
import Component from 'vue-class-component'
import Vue from 'vue'
import { MenuItem } from '@/types'

@Component({
  components: {
    HeaderMenu
  }
})
export default class Header extends Vue {
  showMenu: boolean = false
  userInfo: { name: string; avatar: string } = {
    name: 'John Doe',
    avatar: './images/Man.jpg'
  }
  menuItems: MenuItem[] = [
    { id: 1, route: '/', title: 'Home' },
    { id: 2, route: '/about', title: 'About' },
    { id: 3, route: '/contact', title: 'Contact' }
  ]

  handleToggle (): void {
    this.showMenu = !this.showMenu
  }
}
</script>

<style scoped>
header {
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
  z-index: 3;
}

.menu-icon {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-icon img {
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
