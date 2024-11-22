<template>
    <div class="sale-history">
      <h2>Historial de Ventas</h2>
      <table v-if="transactions.length > 0">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Pagado</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction._id">
            <td>{{ transaction.crypto_code }}</td>
            <td>{{ transaction.crypto_amount }}</td>
            <td>{{ transaction.money }}</td>
            <td>{{ formatDate(transaction.datetime) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay transacciones registradas.</p>
    </div>
  </template>
  
  <script>
  import apiClient from "@/services/apiClient"; 
  
  export default {
    name: "SalesHistory",
    data() {
      return {
        transactions: [],
      };
    },
    props: {
      userId: {
        type: String,
        required: true,
      },
    },
    created() {
      this.cargartransactions();
    },
    methods: {
        formatDate(datetime) {
        if (!datetime) return "Fecha no disponible";
        const date = new Date(datetime);
        return date.toLocaleString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    },
    
      async cargartransactions() {
        try {
          const response = await apiClient.getTransacciones(this.userId);
          this.transactions = response.data;
        } catch (error) {
          console.error("Error al cargar transacciones:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .sales-history {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  thead {
    background-color: #f4f4f4;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  </style>
  