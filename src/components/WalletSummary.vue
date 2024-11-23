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
    </div>
  </template>
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "WalletSummary",
    computed: {
      ...mapGetters({
        wallet: "getCurrentStatus", 
      }),
    },
  };
  </script>
  