<template>
  <div class="home">
    <h1>Bienvenido, {{ idUsuario }}</h1>
    <p>Tu ID de usuario es: {{ idUsuario }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState({
      idUsuario: (state) => state.idUser, // Accede al estado de Vuex
    }),
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 20px;
}
</style>
