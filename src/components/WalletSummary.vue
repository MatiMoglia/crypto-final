<template>
  <div class="wallet-summary">
    <h1>Resumen de Criptomonedas</h1>
    <table>
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto in wallet" :key="crypto.crypto_code">
          <td>{{ crypto.crypto_code.toUpperCase() }}</td>
          <td>{{ crypto.crypto_amount }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!wallet.length">No tienes criptomonedas en tu billetera.</p>
    <div v-if="wallet.length">
      <h2>Total: {{ totalAmount }} monedas</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/services/apiClient"; 

export default {
  name: "WalletSummary",
  data() {
    return {
      wallet: [], 
      totalAmount: 0,
    };
  },
  computed: {
    ...mapGetters({
      userId: "getCurrentUserId", 
    }),
  },
  watch: {
    userId: "fetchWallet", 
  },
  methods: {
    async fetchWallet() {
      if (this.userId) {
        try {
          const response = await api.getWalletBalance(this.userId);
          const transactions = response.data;
          
          const wallet = this.aggregateCryptos(transactions);

          this.wallet = wallet;
          this.totalAmount = wallet.reduce((total, crypto) => total + crypto.crypto_amount, 0);
        } catch (error) {
          console.error("Error al obtener la billetera", error);
        }
      }
    },
    aggregateCryptos(transactions) {
      const aggregated = transactions.reduce((acc, transaction) => {
        const cryptoCode = transaction.crypto_code;
        const amount = transaction.crypto_amount;

        if (acc[cryptoCode]) {
          acc[cryptoCode].crypto_amount += amount;
        } else {
          acc[cryptoCode] = { crypto_code: cryptoCode, crypto_amount: amount };
        }

        return acc;
      }, {});

      return Object.values(aggregated); // Retorna un array de las criptos agregadas
    },
  },
  created() {
    this.fetchWallet(); // Cargar la billetera cuando el componente se cree
  },
};
</script>
