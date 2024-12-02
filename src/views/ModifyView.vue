<template>
  <div class="modify">
    <div class="new">
      <div v-if="loading" class="loader"></div>
      <form v-irptloading" @submit.prevent>
        <div class="title">
        <h1>EDITAR</h1>
        <h3>Transaccion ID: <span class="transaction-id">{{ id }}</span></h3>
        </div>
        <div class="criptos">
          <div class="select">
            <select
              id="crypto-select"
              v-model="transactionModify.crypto_code"
              @change="getAgencies(transactionModify.crypto_code)"
            >
              <option value="" disabled selected hidden>CRIPTOMONEDA</option>
              <option value="btc">BITCOIN</option>
              <option value="eth">ETHEREUM</option>
              <option value="usdt">THETER</option>
              <option value="usdc">USD COIN</option>
              <option value="dai">DAI</option>
            </select>
          </div>
        </div>
        <div class="cant-wallet">
          Criptos disponibles en la cuenta: 
          <span class="money" v-if="selectedCryptoBalance !== null">{{ selectedCryptoBalance }}</span>
        </div>
        <div class="select">
          <select
            id="agency-select"
            v-model="selectedAgency"
            @change="enableAmount"
            :disabled="selectAgenciesDisabled"
          >
            <option value="" disabled selected hidden>SELECCIONAR AGENCIA</option>
            <option
              v-for="agency in agencies"
              :key="agency.agency"
              :value="agency"
            >
              {{ agency.agency.toUpperCase() + " - PRECIO: " + agency.values.totalAsk }}
            </option>
          </select>
        </div>

        <div class="amount-modify">
          <input
            type="number"
            id="crypto-amount"
            v-model="transactionModify.crypto_amount"
            placeholder="CANTIDAD A COMPRAR"
            :disabled="setAmountDisabled"
            @input="calculateAmount"
          />
        </div>

        <div class="money-modify">
          <input
            type="number"
            id="money"
            v-model="transactionModify.money"
            placeholder="IMPORTE $"
            disabled
          />
        </div>

        <div class="select">
          <select id="action-select" v-model="transactionModify.action">
            <option value="" disabled selected hidden>TRANSACCIÓN</option>
            <option value="purchase">COMPRAR</option>
            <option value="sale">VENDER</option>
          </select>
        </div>
        <div class="buttons">
          <button class="btn" @click.prevent="edit">GUARDAR</button>
          <button class="btn" @click.prevent="cancel">CANCELAR</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientApi from "../services/apiClient";
import CriptoApi from "../services/apiCripto";
import { toast } from "vue3-toastify"; 
import "vue3-toastify/dist/index.css";

export default {
  name: "Modify",
  data() {
    return {
      transactionModify: {
        user_id: this.$store.state.idUser,
        action: "",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      },
      selectedAgency: "",
      selectedCryptoBalance: null,
      agencies: [],
      selectAgenciesDisabled: true,
      setAmountDisabled: true,
      loading: false,
    };
  },
  computed: {
    id() {
       return this.$route.query.id;
    },
    ...mapGetters({
            wallet: "getCurrentStatus",
        }),
  },
  mounted() {
  this.loading = true;
  this.$store.commit('insertTransaction');
  ClientApi.getTransactionsById(this.id)
      .then((response) => {
      this.transactionModify = response.data;
      })
      .catch((error) => {
      toast.error("Error al obtener la transacción:", error);
      })
      .finally(() => {
      this.loading = false;
      });
  },
  methods: {
    edit() {
      this.Loading = true;
      this.transactionModify.datetime = new Date();
      if (this.transactionModify.action === "sale") {
        const cryptoBalance = this.getAmountInWallet(this.transactionModify.crypto_code);
        if (!cryptoBalance) {
          toast.error("No tienes suficientes criptomonedas para realizar esta transacción");
          return;
        }
        if (parseFloat(this.transactionModify.crypto_amount) > cryptoBalance) {
          toast.error("No tienes suficientes criptomonedas para realizar esta transacción");
          return;
        }
      }
      ClientApi.editTransaction(this.transactionModify._id, this.transactionModify)
        .then(() => {
          this.$store.commit("insertTransaction"); 
                setTimeout(() => {
                  this.$router.push("/history");
                }, 2000);
                toast.success("Transacción editada correctamente."); 
        })
        .catch(() => {
          toast.error("Error al editar la transacción");
        })
        .finally(() => {
          this.Loading = false;
        });
    },
    cancel() {
      setTimeout(() => {
        this.$router.push("/history");
      }, 3000); 
      toast.info("Edición cancelada.");
    },
    getAmountInWallet(crypto_code) {
      const inWallet = this.wallet.find((entry) => entry.crypto_code === crypto_code);
      return inWallet ? parseFloat(inWallet.crypto_amount).toFixed(8) : 0;
    },
    getAgencies(crypto) {
      this.selectAgenciesDisabled = true;
      this.selectedCryptoBalance = this.getAmountInWallet(crypto);
      CriptoApi.getAgenciesInformation(crypto)
        .then((res) => {
          this.agencies = Object.keys(res.data).map((agency, index) => {
            return { agency: agency, values: Object.values(res.data)[index] };
          });
          this.selectAgenciesDisabled = false;
        })
        .catch(() => {
          toast.error("Error al obtener agencias.");
        });
    },
    enableAmount() {
      this.setAmountDisabled = false;
    },
    calculateAmount() {
      if (this.selectedAgency) {
        this.transactionModify.money = (
          this.transactionModify.crypto_amount * this.selectedAgency.values.totalAsk
        ).toFixed(2);
      }
    },
  },
};
</script>

<style scoped>
.modify {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100vw; 
    height: 100vh; 
    background: rgba(44, 42, 42, 0.8); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    z-index: -1; 
    
}  
.title{
  color: white;
}
.new {
    max-width: 600px;
    border: 2px solid #d4af37; 
    border-radius: 10px; 
    padding: 20px;
    margin: 0 auto;
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}
.cant-wallet {
  color: #d4af37;
  margin: 5px 0;
}
.money {
  color: white;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
  
select, input {
  width: 90%;
  padding: 10px;
  font-size: 1rem;
  color: #d4af37; 
  background-color: #1c1c1c; 
  border: 1px solid #d4af37; 
  border-radius: 5px; 
  text-align: center;
}
  
select:disabled, input:disabled {
  background-color: #2a2a2a; 
  color: #7a7a7a; 
  border-color: #7a7a7a; 
}
  
select option {
  background-color: #1c1c1c; 
  color: #d4af37; 
}

.buttons {
  display: flex;
  gap: 10px;
}

button.btn {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
  background-color: #d4af37; 
  border: none;
  border-radius: 5px; 
  cursor: pointer;
  transition: all 0.3s ease;
}
  
button.btn:hover {
  background-color: #b89d2b; 
  transform: scale(1.05); 
}
  
button.btn:active {
  transform: scale(1);
}
  
.loader {
  border: 5px solid #1c1c1c; 
  border-top: 5px solid #d4af37; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 20px auto;
  animation: spin 1s linear infinite;
}
h1 {
  font-size: 2.5rem;
  color: #f4d03f;
  font-family: 'Arial', sans-serif;
  margin-bottom: 10px;
}
.transaction-id {
  font-style: italic; 
  color: gold; 
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
  