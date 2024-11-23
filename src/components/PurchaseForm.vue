<template>
    <div class="purchase">
        <form action="#" method="post">
            <div class="criptos">
                <div class="select">
                    <select id="standard-select" v-model="buySale.crypto_code" @change="getAgencies(buySale.crypto_code)">
                        <option value="" disabled selected hidden>CRIPTOMONEDA</option>
                        <option value="btc">BITCOIN</option>
                        <option value="eth">ETHEREUM</option>
                        <option value="usdt">THETER</option>
                        <option value="usdc">USD COIN</option>
                        <option value="dai">DAI</option>
                    </select>
                    <i></i>
                </div>
                <div class="select">
                    <select
                        id="standard-select"
                        v-model="selectedAgency"
                        @change="enableAmount()"
                        :disabled="selectAgenciesDisabled"
                    >
                        <option value="" disabled selected hidden>SELECCIONAR AGENCIA</option>
                        <option v-for="agency in agencies" :key="agency.agency" :value="agency">
                            {{ agency.agency.toUpperCase() + " - Precio: " + agency.values.totalAsk }}
                        </option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="cantCompra">
                <input type="number" min="0" id="cantBuy" name="cantBuy" v-model="buySale.crypto_amount" placeholder="CANTIDAD A COMPRAR" required :disabled="setAmountDisabled"
                @input="calculateAmount()">
            </div>
            <div class="pagoCompra">
                <input type="number" id="amount" name="amount" v-model="buySale.money" placeholder="IMPORTE $" required disabled>
            </div>
            <button class="btn" type="submit" @click.prevent="buyCripto">
                <span v-if="!loading">COMPRAR</span>
                <div v-if="loading" class="loader"></div>
            </button>
        </form>
    </div>
</template>

<script>
import ClientApi from "@/services/apiClient";
import CryptoApi from "@/services/apiCripto";

export default {
  name: "FormPurchase",
  data() {
    return {
      loading: false,
      buySale: {
        user_id: this.$store.state.idUser,
        action: "purchase",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      },
      selectedAgency: "",
      agencies: [],
      selectAgenciesDisabled: true,
      setAmountDisabled: true,
    };
  },
  methods: {
    buyCripto() {
      this.loading = true;

      if (this.buySale.crypto_amount === "") {
        console.log("Ingrese la cantidad a comprar");
      } else if (!parseFloat(this.buySale.crypto_amount)) {
        console.log("Debe ingresar un valor numérico");
      } else if (parseFloat(this.buySale.crypto_amount) <= 0) {
        console.log("La cantidad a ingresar debe ser mayor a 0");
      } else if (this.buySale.money === "") {
        console.log("Ingrese el valor de la compra");
      } else if (!parseFloat(this.buySale.money)) {
        console.log("Debe ingresar un valor numérico");
      } else if (parseFloat(this.buySale.money) <= 0) {
        console.log("El monto a ingresar debe ser mayor a 0");
      } else if (this.buySale.crypto_code === "") {
        console.log("Debe seleccionar una criptomoneda");
      } else {
        this.buySale.datetime = new Date();
        this.buySale.datetime.setHours(this.buySale.datetime.getHours() - 3);
        ClientApi.newTransaction(this.buySale)
          .then(() => {
            console.log("Compra realizada con éxito");
            this.$store.commit("insertTransaction");
            this.buySale.crypto_code = "";
            this.buySale.crypto_amount = "";
            this.buySale.money = "";
            this.selectedAgency = "";
          })
          .catch(() => {
            console.log("Error al realizar la compra");
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    getAgencies(crypto) {
      CryptoApi.getAgenciesInformation(crypto)
        .then((res) => {
          this.agencies = Object.keys(res.data).map((agency, index) => {
            return { agency: agency, values: Object.values(res.data)[index] };
          });
          this.selectAgenciesDisabled = false;
        })
        .catch();
    },
    enableAmount() {
      this.setAmountDisabled = false;
    },
    calculateAmount() {
      this.buySale.money = (
        this.buySale.crypto_amount * this.selectedAgency.values.totalAsk
      ).toFixed(2);
    },
  },
};
</script>

<style scoped>
.purchase {
    margin: 20px;
}
.criptos {
    display: flex;
    gap: 10px;
}
.select {
    width: 200px;
}
.cantCompra, .pagoCompra {
    margin-top: 20px;
}
input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
}
.btn {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
}
.btn:hover {
    background-color: #45a049;
}
.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
