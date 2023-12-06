<template>
  <div class="menu-content">
    <router-link
      v-for="item in menuItems"
      :key="item.id"
      :to="item.route"
    >
      <h3 @click="handleItemClick">
        {{ item.title }}
      </h3>
    </router-link>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

@Component
export default class HeaderMenu extends Vue {
  @Prop({ required: true }) menuItems!: {
    id: number
    route: string
    title: string
  }[]
  handleItemClick ():void{
    this.$emit('close');
  }
}
</script>

<style scoped>
.menu-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 15%;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px 5%;
  z-index: 3;
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

@media only screen and (max-width: 600px) {
  .menu-content {
    width: 100%;
  }
}
</style>