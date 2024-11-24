<template>
    <Navbar />
    <div class="history-color">
      <div class="history">
        <h1>HISTORIAL DE TRANSACCIONES</h1>
        <div class="container">
          <div v-if="loading" class="loader"></div>
          <table v-if="!loading" class="transaction-table">
            <thead>
              <tr>
                <th>CRIPTOMONEDA</th>
                <th>CANTIDAD</th>
                <th>PRECIO</th>
                <th>OPERACIÓN</th>
                <th>FECHA DE OPERACIÓN</th>
                <th>EDITAR</th>
                <th>BORRAR</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="transaction in sortedTransactions" 
                :key="transaction._id" 
                :class="{ selected: selectRow === transaction._id }">
                <td>{{ nameCriptos(transaction.crypto_code) }}</td>
                <td>{{ transaction.crypto_amount }}</td>
                <td>$ {{ transaction.money }}</td>
                <td>{{ typeAction(transaction.action) }}</td>
                <td>{{ time(transaction.datetime) }}</td>
                <td>
                  <router-link :to="{name: 'Modify', query: {id: selectRow}}">
                    <button @click="edit(transaction._id)" class="btn btn-edit">
                      Editar
                    </button>
                  </router-link>
                </td>
                <td>
                  <button @click="deleteRow(transaction._id)" class="btn btn-delete">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!loading && sortedTransactions.length === 0" class="no-data">
            La tabla no presenta datos...
          </div>
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
    edit(id){
        if(this.selectRow !== id){
            this.selectRow = id;
        }else{
            this.selectRow = null;
        }
    },
    deleteRow(id){
        this.loading = true;

        if(confirm("¿Está seguro que desea eliminar esta transacción?")) {
            ClientApi.deleteTransaction(id)
              .then(() => {
                  this.$store.commit('SET_TRANSACTIONS', this.transactions.filter(t => t._id !== id));
              })
              .catch((error) => {
                alert(error.message);
              }).finally(() => {
                  this.loading = false;
              });
      }
    },
    time(datetime) {
        return datetime.slice(0, 10) + " " + datetime.slice(11, 16) + "Hs";
    },
  },
}
</script>
<style scoped>
.history-color {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh; 
  background: rgba(44, 42, 42, 0.8); 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  z-index: -1; 
}

.history {
  z-index: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  margin-top: 0;
}

h1 {
  font-size: 2.5rem;
  color: #f4d03f;
  margin-bottom: 20px;
  text-align: center;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.transaction-table thead {
  background-color: #333;
  color: #f4d03f;
  text-transform: uppercase;
}

.transaction-table th,
.transaction-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #444;
}

.transaction-table tr:hover {
  background-color: #292929;
}

.transaction-table .selected {
  background-color: #444;
  color: #f4d03f;
}

.btn {
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
}

.btn-edit {
  background-color: #4CAF50;
  color: white;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #e53935;
}

.no-data {
  color: #f4d03f;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
}
</style>
