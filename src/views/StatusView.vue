<template>
  <div class="body">
    <Navbar />
    <div class="container">
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
    </div>
  </div>
</template>

  
<script>
  import { mapGetters } from 'vuex';
  import Navbar from "@/components/NavBar.vue";
  import CryptoApi from "@/services/apiCripto";
  
  export default {
    name: 'CurrentStatus',
    components: { Navbar },
    data() {
      return {
        actualTotalMoney: 0,
        currentMoney: [],
        loading: true,
      };
    },
    computed: {
      ...mapGetters({
        wallet: "getCurrentStatus",
      }),

    },
    methods: {
      nameCriptos(crypto_code) {
        if (crypto_code == "btc")
          return "Bitcoin";
        if (crypto_code == "eth")
          return "Ethereum";
        if (crypto_code == "usdt")
          return "Theter";
        if (crypto_code == "usdc")
          return "USDCoin";
        if (crypto_code == "dai")
          return "Dai";
      },
    },
    async mounted() {
      try {
        const cryptoData = {};

        for (const coin of this.wallet) {
          const res = await CryptoApi.getPriceMoney(coin.crypto_code);
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
        console.log(this.currentMoney);
      }catch (error) {
        console.error("Error fetching data:", error);
        this.$toast.error("Error");
        this.loading = false;
      }
    },
  };
</script>
