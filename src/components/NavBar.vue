<template>
  <div class="navigation">
    <ul>
      <li class="user-info" data-aos="fade-right">
        <span class="title">
          <i class="fas fa-user-circle"></i> ¡Hola! ID: {{ $store.state.idUser }}
        </span>
      </li>
      <div class="nav-items">
        <li>
          <router-link to="/transactions" class="nav-link" data-aos="fade-down">
            <i class="fas fa-exchange-alt"></i> Compra-Venta
          </router-link>
        </li>
        <li>
          <router-link to="/history" class="nav-link" data-aos="fade-down">
            <i class="fas fa-history"></i> Historial
          </router-link>
        </li>
        <li>
          <router-link to="/status" class="nav-link" data-aos="fade-down">
            <i class="fas fa-info-circle"></i> Estado Actual
          </router-link>
        </li>
        <li>
          <router-link to="/market" class="nav-link" data-aos="fade-down">
            <i class="fas fa-chart-line"></i> Mercado
          </router-link>
        </li>
        <li>
          <span class="logout nav-link" v-on:click="quit()" data-aos="fade-down">
            <i class="fas fa-sign-out-alt"></i> Logout
          </span>
        </li>
      </div>
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
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  .navigation {
  width: 100%;
  background: linear-gradient(to right, rgba(5, 5, 5, 0.85), rgba(59, 59, 59, 0.85)); 
  display: flex;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); 
  backdrop-filter: blur(10px); 
}
  
ul {
display: flex;
justify-content: space-between;
align-items: center;
list-style: none;
margin: 0;
padding: 0;
width: 97%;
}
  
.user-info {
  margin-right: auto; 
  color: #f4d03f;
  font-weight: bold;
  font-size: 1.2rem;
}
  
.nav-items {
  display: flex;
  gap: 30px; 
}
  
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.3s ease, transform 0.2s;
}

.nav-link:hover {
  color: #f4d03f;
  transform: scale(1.05);
}
  
.logout {
  color: red;
   cursor: pointer;
}
  
.logout:hover {
  color: rgb(236, 65, 65);
  transform: scale(1.1);
}
  
.nav-link i {
  font-size: 1.2rem;
}
</style>
  