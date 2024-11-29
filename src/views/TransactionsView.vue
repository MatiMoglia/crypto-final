<template>
  <Navbar />
  <div class="trade">
       <br><br><br>
       <img class="logo" src="@/assets/logo.png" alt="Crypto Trade M&M Logo" />
       <h1>CRYPTO-TRADE M&M</h1>
       <div class="conteiners">
           <div class="form">
               <FormPurchase />
           </div>
           <div class="form">
               <FormSale />
           </div>
       </div>
       <div class="market-cripto">
           <div v-if="loading" class="loader"></div>
           <div v-else class="cripto-grid">
               <CriptosCard
                   v-for="coin in filteredCoins"
                   :key="coin.id"
                   :coin="coin"
               />
           </div>
       </div>
  </div>
</template>

<script>
  import FormPurchase from "@/components/PurchaseForm.vue";
  import FormSale from "@/components/SaleForm.vue";
  import Navbar from "@/components/NavBar.vue";
  import CriptosCard from "@/components/CriptosCard.vue";
  import apiMarket from "../services/apiMarket";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  export default {
      name: "Transactions",
      components: { FormPurchase, FormSale, Navbar, CriptosCard },
      data() {
          return {
              coins: [],
              loading: true,
          };
      },
      computed: {
          filteredCoins() {
            return this.coins.filter((coin) =>
            ["btc", "eth", "usdt", "usdc", "dai"].includes(coin.symbol)
          ); 
        },
      },
      async mounted() {
        try {
          this.loading = true;
          const response = await apiMarket.getMarketData("ars", 100, 1);
          this.coins = response.data;
        } catch (error) {
          toast.error("Error al cargar los datos del mercado");
        } finally {
          this.loading = false;
        }
      },
  };
</script>

<style scoped>
body {
  margin: 0;
}
.trade {
    background: rgba(44, 42, 42, 0.8); 
}
.conteiners {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  width: 100%;
}
.logo {
  width: 150px; 
  height: 150px;
  border-radius: 50%; 
  object-fit: cover;
  border: 2px solid #d4af37; 
}

h1 {
  font-size: 2.5rem;
  color: #f4d03f;
  font-family: 'Arial', sans-serif;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #f4d03f;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.cripto-grid {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center; 
  gap: 16px; 
  padding: 16px;
  margin: 0 auto;
}
</style>
