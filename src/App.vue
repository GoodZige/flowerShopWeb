<template>
  <div id="app">
    <!-- <router-link to="/">hello</router-link>
    <router-link to="/nav">nav</router-link> -->
    <router-view name="header"></router-view>
    <router-view name="body"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
