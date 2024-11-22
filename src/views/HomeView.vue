<template>
  <div class="home">
    <h1>Bienvenido, {{ idUsuario }}</h1>
    <p>Tu ID de usuario es: {{ idUsuario }}</p>

    <hr />
    <h2>Registrar Compra de Criptomonedas</h2>
    <PurchaseForm />
    <hr />
    <h2>Registrar Venta de Criptomonedas</h2>
    <sale-form />

    <hr />

    <sales-history :userId="idUsuario" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SaleForm from "@/components/SaleForm.vue";
import SalesHistory from "@/components/SaleHistory.vue";
import PurchaseForm from "@/components/PurchaseForm.vue";
export default {
  name: "Home",
  components: {
    SaleForm,
    SalesHistory,
    PurchaseForm  
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
