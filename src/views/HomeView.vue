<template>
  <div class="home">
    <h1>Bienvenido, {{ idUsuario }}</h1>
    <p>Tu ID de usuario es: {{ idUsuario }}</p>

    <hr />
    <h2>Registrar Compra de Criptomonedas</h2>
    <PurchaseForm />
    <hr />
    <h2>Registrar Venta de Criptomonedas</h2>
    <SaleForm />
    <hr />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SaleForm from "@/components/SaleForm.vue";
import PurchaseForm from "@/components/PurchaseForm.vue";
export default {
  name: "Home",
  components: {
    SaleForm,
    PurchaseForm,
  },
  computed: {
    ...mapState({
      idUsuario: (state) => state.idUser,
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
