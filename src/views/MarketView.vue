<template>
  <Navbar />
  <div class="container">
    <div class="row">
      <h1>PRECIOS DEL MERCADO</h1>
      <input
        type="text"
        class="search-input"
        placeholder="Buscar moneda o símbolo..."
        v-model="textSearch"
        @keyup="searchCoin"
        autofocus
      />
      <div v-if="loading" class="loader"></div>
      <div v-else>
        <table class="table-cripto">
          <thead>
            <tr>
              <th>#</th>
              <th>Moneda</th>
              <th>Precio</th>
              <th>Variación 24h</th>
              <th>Volumen Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, index) in limitedCoins" :key="coin.id">
              <td class="text-muted">{{ index + 1 }}</td>
              <td class="coin-info">
                <img :src="coin.image" :alt="coin.name" class="coin-icon" />
                <div class="coin-text">
                  <span>{{ coin.name }}</span>
                  <span class="text-muted text-uppercase">({{ coin.symbol }})</span>
                </div>
              </td>
              <td>{{ coin.current_price.toLocaleString("en-US", { style: "currency", currency: "ARS" }) }}</td>
              <td
                :class="[coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger']"
              >
                {{ coin.price_change_percentage_24h.toFixed(2) }}%
              </td>
              <td>{{ coin.total_volume.toLocaleString("en-US") }}</td>
            </tr>
          </tbody>
        </table>
        <button v-if="showLoadMore" @click="loadMoreCoins" class="btn-load-more">
          Ver más
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiMarket from "../services/apiMarket"; 
import Navbar from "../components/NavBar.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "MarketPrices",
  components: { Navbar },
  data() {
    return {
      coins: [], 
      filteredCoins: [], 
      displayedCoins: 50, 
      textSearch: "", 
      loading: true,
    };
  },
  computed: {
    limitedCoins() {
      return this.filteredCoins.slice(0, this.displayedCoins);
    },
    showLoadMore() {
      return this.filteredCoins.length > this.displayedCoins;
    },
  },
  async mounted() {
    try {
      this.loading = true; 
      const response = await apiMarket.getMarketData("ars", 100, 1);
      this.coins = response.data;
      this.filteredCoins = response.data;
    setTimeout(() => {
        this.loading = false;
    }, 2000); 
    } catch (error) {
      toast.error("Error al cargar los datos del mercado");
    } finally {
      this.loading = false; 
    }
  },
  methods: {
    searchCoin() {
      this.filteredCoins = this.coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(this.textSearch.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(this.textSearch.toLowerCase())
      );
      this.displayedCoins = 50; 
    },
    loadMoreCoins() {
      this.displayedCoins += 50;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1350px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(44, 42, 42, 0.8);
  color: #FFD700; 
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #FFD700;
}

.search-input {
  display: block;
  width: 50%; 
  padding: 10px 15px;
  margin: 0 auto 20px; 
  font-size: 1rem;
  border: 2px solid #FFD700;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #FFD700;
}

.search-input:focus {
  outline: none;
  border-color: #e7d77d;
}

.table-cripto {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background: rgba(44, 42, 42, 0.8);
}

.table-cripto thead {
  background-color: #1a1a1a;
}

.table-cripto th {
  color: #FFD700;
  padding: 10px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #FFD700;
}

.table-cripto td {
  padding: 10px;
  font-size: 0.95rem;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid #3b3b3b;
}

.table-cripto th:first-child,
.table-cripto td:first-child {
  width: 5%; 
  text-align: right;
}

.table-cripto tr {
  transition: background-color 0.3s ease-in-out;
}

.text-muted {
  color: #a9a9a9;
}

.coin-icon {
  width: 30px;
  margin-right: 10px;
  vertical-align: middle;
}

.coin-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.coin-text {
  text-align: left;
}

.btn-load-more {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #FFD700;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-load-more:hover {
  background-color: #ffdf80;
  color: #000000;
}

.text-success {
  color: #0f0 !important;
}
.text-danger {
  color: rgb(185, 79, 79) !important;
}
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ffd700; 
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
