<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f1c40f; 
  text-decoration: none;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #d4af37; 
}

nav a.router-link-exact-active {
  color: #f39c12; 
}
</style>
