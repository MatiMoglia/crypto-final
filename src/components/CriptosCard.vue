<template>
    <div class="crypto-card">
      <img :src="coin.image" :alt="coinName" class="crypto-logo" />
      <h2>{{ coinName }}</h2>
      <p>Código: {{ coin.symbol.toUpperCase() }}</p>
      <p>Precio actual: {{ coin.current_price.toLocaleString("en-US", { style: "currency", currency: "ARS" }) }}</p>
      <p :class="priceChangeClass">
        Variación 24h: {{ coin.price_change_percentage_24h.toFixed(2) }}%
      </p>
    </div>
</template> 

<script>
  export default {
    name: "CryptoCard",
    props: {
      coin: {
        type: Object,
        required: true,
      },
    },
    computed: {
      coinName() {
        if (this.coin.symbol === "btc") return "Bitcoin";
        if (this.coin.symbol === "eth") return "Ethereum";
        if (this.coin.symbol === "usdt") return "Tether";
        if (this.coin.symbol === "usdc") return "USDCoin";
        if (this.coin.symbol === "dai") return "Dai";
        return "Criptomoneda no reconocida";
      },
      priceChangeClass() {
        return {
          "text-success": this.coin.price_change_percentage_24h > 0,
          "text-danger": this.coin.price_change_percentage_24h < 0,
        };
      },
    },
  };
</script>

<style scoped>
.crypto-card {
  background-color: #2b2b2b;
  color: #f4d03f; 
  border: 1px solid #f4d03f;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 300px;
  margin: 16px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.crypto-card:hover {
  transform: scale(1.05);
}

.crypto-logo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #ffd700;
}

.text-success {
  color: #28a745; 
}

.text-danger {
  color: #dc3545; 
}
h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #f4d03f;
}

p {
  margin: 4px 0;
  color: rgb(238, 237, 162);
}
</style>
