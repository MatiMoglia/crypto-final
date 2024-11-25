<template>
  <div class="container">
    <div class="purchase">
      <h2>COMPRA</h2>
      <form action="#" method="post">
        <div class="criptos">
          <div class="select">
            <select
              id="standard-select"
              v-model="buySale.crypto_code"
              @change="getAgencies(buySale.crypto_code)"
            >
              <option value="" disabled selected hidden>CRIPTOMONEDA</option>
              <option value="btc">BITCOIN</option>
              <option value="eth">ETHEREUM</option>
              <option value="usdt">THETER</option>
              <option value="usdc">USD COIN</option>
              <option value="dai">DAI</option>
            </select>
          </div>
          <div class="select">
            <select
              id="standard-select"
              v-model="selectedAgency"
              @change="enableAmount()"
              :disabled="selectAgenciesDisabled"
            >
              <option value="" disabled selected hidden>SELECCIONAR AGENCIA</option>
              <option
                v-for="agency in agencies"
                :key="agency.agency"
                :value="agency"
              >
                {{ agency.agency.toUpperCase() + " - Precio: " + agency.values.totalAsk }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-group">
          <input
            type="number"
            min="0"
            id="cantBuy"
            name="cantBuy"
            v-model="buySale.crypto_amount"
            placeholder="Cantidad a Comprar"
            required
            :disabled="setAmountDisabled"
            @input="calculateAmount()"
            class="small-input"
          />
        </div>
        <div class="input-group">
          <input
            type="number"
            id="amount"
            name="amount"
            v-model="buySale.money"
            placeholder="Importe $"
            required
            disabled
            class="small-input"
          />
        </div>
        <button class="btn" type="submit" @click.prevent="buyCripto">
          <span v-if="!loading">Comprar</span>
          <div v-if="loading" class="loader"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import ClientApi from "@/services/apiClient";
import CriptoApi from "@/services/apiCripto";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
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
        toast.error("Ingrese la cantidad a comprar");
      } else if (!parseFloat(this.buySale.crypto_amount)) {
        toast.error("Debe ingresar un valor numérico para la cantidad");
      } else if (parseFloat(this.buySale.crypto_amount) <= 0) {
        toast.error("La cantidad a ingresar debe ser mayor a 0");
      } else if (this.buySale.money === "") {
        toast.error("Ingrese el valor de la compra");
      } else if (!parseFloat(this.buySale.money)) {
        toast.error("Debe ingresar un valor numérico para el monto");
      } else if (parseFloat(this.buySale.money) <= 0) {
        toast.error("El monto a ingresar debe ser mayor a 0");
      } else if (this.buySale.crypto_code === "") {
        toast.error("Debe seleccionar una criptomoneda");
      } else {
        this.buySale.datetime = new Date();
        this.buySale.datetime.setHours(this.buySale.datetime.getHours() - 3);

        ClientApi.newTransaction(this.buySale)
          .then(() => {
            toast.success("Compra realizada con éxito"); // Notificación de éxito
            this.$store.commit("insertTransaction");
            this.buySale.crypto_code = "";
            this.buySale.crypto_amount = "";
            this.buySale.money = "";
            this.selectedAgency = "";
          })
          .catch(() => {
            toast.error("Error al realizar la compra"); // Notificación de error
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    getAgencies(crypto) {
      CriptoApi.getAgenciesInformation(crypto)
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
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 20px;
  color: #f4d03f; 
}

.purchase {
  background-color: #2b2b2b;
  border: 1px solid #f4d03f;
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #f4d03f;
}

.criptos,
.input-group {
  margin-bottom: 20px;
}

.select {
  width: 100%;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #f4d03f;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #f4d03f;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #f4d03f;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #f4d03f;
}
.input-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: center; 
}
.small-input {
  width: 200px; 
  padding: 8px;
  font-size: 14px;
  border: 1px solid #f4d03f;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #f4d03f;
  text-align: center;
}


.btn {
  background-color: #f4d03f;
  color: #1a1a1a;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.btn:hover {
  background-color: #d4ac0d;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f4d03f;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
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