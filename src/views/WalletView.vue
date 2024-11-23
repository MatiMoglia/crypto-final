<template>
    <div class="wallet-view">
      <h1>Mi Billetera</h1>
      <WalletSummary />
    </div>
  </template>
  
  <script>
  import WalletSummary from "@/components/WalletSummary.vue"; 
  
  export default {
    name: "WalletView",
    components: {
      WalletSummary,
    },
  };
  </script>
  
  <style scoped>
  .wallet-view {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  </style>
  