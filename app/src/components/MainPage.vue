<template>
  <div>
    <PageHeader :showMenu="showMenu" :userInfo="userInfo" @toggle="toggleMenu" />
    <MenuContent v-if="showMenu" :menuItems="menuItems" />
    <UserTablePage/>
  </div>
</template>

<script>
import UserTablePage from './TablePage/UserTablePage.vue';
import PageHeader from './Header/PageHeader.vue';
import MenuContent from './Header/MenuContent.vue';

export default {
  components: {
    UserTablePage,
    PageHeader,
    MenuContent
  },
  data() {
    return {
      showMenu: false,
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
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

