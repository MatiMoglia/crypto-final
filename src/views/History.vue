<template>
  <div class="body">
      <Navbar/>
      <div class="history">
          <div class="container">
              <div v-if="loading" class="loader"></div>
              <table v-if="!loading">
                  <thead>
                      <tr>
                          <th>CRIPTOMONEDA</th>
                          <th>CANTIDAD</th>
                          <th>PRECIO</th>
                          <th>TIPO DE OPERACION</th>
                          <th>FECHA DE OPERACION</th>
                          <th>EDICION | BORRADO</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr 
                          v-for="transaction in sortedTransactions" 
                          :key="transaction._id" :class="{ selected: selectRow === transaction._id }">
                          <td class="row">{{ nameCriptos(transaction.crypto_code) }}</td>
                          <td class="row">{{ transaction.crypto_amount }}</td>
                          <td class="row"> $ {{ transaction.money }}</td>
                          <td class="row">{{ typeAction(transaction.action) }}</td>
                          <td class="row">{{ time(transaction.datetime) }}</td>
                          <td>
                            <router-link
                              :to="{
                                  name: 'Modify',
                                  query: {
                                      id: selectRow,
                                  },
                              }"
                            >
                              <button 
                                @click="edit(transaction._id)" 
                                class="btn-edit"
                              >
                                Editar
                              </button>
                            </router-link>
                            <button 
                              @click="deleteRow(transaction._id)" 
                              class="btn-delete"
                            >
                              Eliminar
                            </button>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div v-if="!loading && sortedTransactions.length === 0">La tabla está vacía.</div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientApi from '@/services/apiClient.js';
import Navbar from "@/components/NavBar.vue";
export default {
  name: "History",
  components: { Navbar },
  data() {
      return {
          selectRow: null,
          loading: false,
      };
  },
  computed:{
      ...mapGetters({
          transactions: "getTransactions",
      }),
      sortedTransactions() {
          return [...this.transactions].sort((a, b) => {
              return new Date(b.datetime) - new Date(a.datetime);
          });
      },
  },
  methods: {
      edit(id){
          if(this.selectRow !== id){
              this.selectRow = id;
              console.log("Seleccionado para edición:", this.selectRow);
          }else{
              this.selectRow = null;
          }
      },
      deleteRow(id){
          this.loading = true;

          if(confirm("¿Está seguro que desea eliminar esta transacción?")) {
              ClientApi.deleteTransaction(id)
              .then(() => {
                  console.log("Transacción eliminada con éxito");
                  this.$store.commit('SET_TRANSACTIONS', this.transactions.filter(t => t._id !== id));
              })
              .catch((error) => {
                  console.error("Error al eliminar la transacción:", error.message || error);
              }).finally(() => {
                  this.loading = false;
              });
          }
      },
      nameCriptos(crypto_code) {
          const cryptoNames = {
              btc: "Bitcoin",
              eth: "Ethereum",
              usdt: "Theter",
              usdc: "USD Coin",
              dai: "Dai",
          };
          return cryptoNames[crypto_code] || "Desconocido";
      },
      typeAction(action) {
          if (action === "purchase") {
              return "Compra";
          }
          if (action === "sale") {
              return "Venta";
          }
          return "Desconocido";
      },
      time(datetime) {
          return datetime.slice(0, 10) + " " + datetime.slice(11, 16) + "Hs";
      },
  },
}
</script>

  
<style scoped>
  .btn-edit, .btn-delete {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  
  .btn-edit {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .btn-edit:hover {
    background-color: #45a049;
  }
  
  .btn-delete {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .btn-delete:hover {
    background-color: #e53935;
  }
  
  .btn-edit.active {
    border: 2px solid #388e3c;
  }
</style>
  