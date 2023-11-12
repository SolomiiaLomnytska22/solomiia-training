<template>
  <div id="app">
    <TablePage/>
  </div>
</template>

<script>
import TablePage from './components/TablePage.vue';

export default {
  name: 'App',
  components:{
    TablePage
  }
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
