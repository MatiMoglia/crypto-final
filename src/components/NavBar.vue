<template>
    <div class="navigation">
      <ul>
        <li class="user-info">
          <span class="title">¡Hola! Usuario ID: {{ $store.state.idUser }}</span>
        </li>
        <li>
          <a href="#">
            <span class="title"><router-link to="/transactions">Compra-Venta</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="title"><router-link to="/history">Historial</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="title"><router-link to="/status">Estado Actual</router-link></span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="title logout" v-on:click="quit()">SALIR</span>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    methods: {
      quit() {
        this.$router.push("/");
      }
    },
  };
  </script>
  
  <style scoped>
  .navigation {
    width: 100%;
    background: rgba(0, 0, 0, 0.8); 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px; 
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 95%; 
    justify-content: space-between; 
  }
  
  ul li {
    display: inline-block; 
    margin-right: 20px; 
  }
  
  ul li.user-info {
    color: #f39c12; 
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  ul li a {
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }
  
  ul li a:hover {
    color: #f39c12; 
  }
  
  ul li .title {
    color: #f39c12; 
  }
  
  ul li a router-link-exact-active {
    color: #f39c12; 
  }
  ul li .logout {
  color: red; 
}

ul li .logout:hover {
  color: darkred; 
}
</style>

  