<template>
  <Navbar />
  <div class="status">
    <div class="container">
      <h1>BILLETERA DE USUARIO</h1>
      <h2>Estado actual de la cuenta</h2>
      <div v-if="loading" class="loader"></div>
      <table v-if="!loading">
        <thead>
          <tr>
            <th>CRIPTOMONEDA</th>
            <th>CANTIDAD</th>
            <th>DINERO</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(coin, index) in wallet.filter((coin) => coin.crypto_amount > 0)" 
            :key="coin._id"
          >
            <td>{{ nameCriptos(coin.crypto_code) }}</td>
            <td>{{ coin.crypto_amount }}</td>
            <td>{{ currentMoney[index] }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="total">
            <td></td>
            <th>TOTAL</th>
            <td>{{ "$ " + actualTotalMoney.toFixed(2) }}</td>
          </tr>
        </tfoot>
      </table>
      <div v-if="!loading">
        <h2>Composición de la Cuenta</h2>
        <canvas id="cryptoChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/NavBar.vue";
import apiCripto from "@/services/apiCripto";
import Chart from "chart.js/auto";

export default {
  name: "CurrentStatus",
  components: { Navbar },
  data() {
    return {
      actualTotalMoney: 0,
      currentMoney: [],
      loading: true,
      chart: null, 
    };
  },
  computed: {
    ...mapGetters({
      wallet: "getCurrentStatus",
    }),
  },
  methods: {
    nameCriptos(crypto_code) {
      if (crypto_code == "btc") return "Bitcoin";
      if (crypto_code == "eth") return "Ethereum";
      if (crypto_code == "usdt") return "Tether";
      if (crypto_code == "usdc") return "USDCoin";
      if (crypto_code == "dai") return "Dai";
    },
    renderChart() {
      const labels = this.wallet
        .filter((coin) => coin.crypto_amount > 0)
        .map((coin) => this.nameCriptos(coin.crypto_code));
      const data = this.currentMoney;

      if (this.chart) this.chart.destroy();

      this.chart = new Chart(document.getElementById("cryptoChart"), {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              label: "Composición de la Cuenta",
              data,
              backgroundColor: [
                "#8c8c8c",
                "#f517f8",
                "#33ff74",
                "#2281e7",
                "gold",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    },
  },renderChart() {
  const canvas = document.getElementById("cryptoChart");
  if (!canvas) {
    console.error("El elemento <canvas> no está en el DOM.");
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    console.error("No se pudo obtener el contexto del canvas.");
    return;
  }

  const labels = this.wallet
    .filter((coin) => coin.crypto_amount > 0)
    .map((coin) => this.nameCriptos(coin.crypto_code));
  const data = this.currentMoney;

  if (this.chart) this.chart.destroy();

  this.chart = new Chart(context, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          label: "Composición de la Cartera",
          data,
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffcd56",
            "#4bc0c0",
            "#9966ff",
            "#ff9f40",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
},
  async mounted() {
    try {
      const cryptoData = {};

      for (const coin of this.wallet) {
        const res = await apiCripto.getPriceMoney(coin.crypto_code);
        const data = {
          crypto_amount: coin.crypto_amount,
          money: parseFloat(coin.money),
          actualPrice: res.data.totalBid,
        };

        cryptoData[coin.crypto_code] = data;

        if (data.crypto_amount > 0) {
          const valueMoney = +(data.crypto_amount * data.actualPrice).toFixed(2);
          this.currentMoney.push(valueMoney);
          this.actualTotalMoney += valueMoney;
        }
      }

      this.loading = false;

      this.$nextTick(() => {
        this.renderChart();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.status {
  position: relative; 
  width: 100%;
  background: rgba(44, 42, 42, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; 
}

.container {
  max-width: 800px;
  border: 2px solid #d4af37;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #1e1e1e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

table {
  width: 100%;
  margin: 20px auto;
  border-collapse: collapse;
}

thead {
  background-color: #1c1c1c;
  color: #d4af37;
}

th,
td {
  border: 1px solid #d4af37;
  padding: 10px;
  text-align: center;
}

tbody tr:hover {
  background-color: #2a2a2a;
  color: #fff;
}

tfoot {
  background-color: #1c1c1c;
}

.total th,
.total td {
  font-weight: bold;
  font-size: 1.2em;
  color: #fff;
}

.loader {
  border: 5px solid #1c1c1c;
  border-top: 5px solid #d4af37;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 50px auto;
  animation: spin 1s linear infinite;
}

h1 {
  font-size: 2.5rem;
  color: #f4d03f;
  font-family: "Arial", sans-serif;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #e2d499;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
canvas {
  max-width: 400px;
  margin: 20px auto;
  display: block;
}
</style>
