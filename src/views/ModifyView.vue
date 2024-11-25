<template>
    <div class="modify">
      <div class="new">
        <div v-if="loading" class="loader"></div>
        <form v-if="!loading" @submit.prevent>
          <div>
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
  
          <div class="cantCompra">
            <input
              type="number"
              id="crypto-amount"
              v-model="transactionModify.crypto_amount"
              placeholder="CANTIDAD A COMPRAR"
              :disabled="setAmountDisabled"
              @input="calculateAmount"
            />
          </div>
  
          <div class="pagoModi">
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
  
          <button class="btn" @click.prevent="edit">GUARDAR</button>
          <button class="btn" @click.prevent="cancel">CANCELAR</button>
        </form>
      </div>
    </div>
  </template>
  

  <script>
  import ClientApi from "@/services/apiClient";
  import CryptoApi from "@/services/apiCripto";
  
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
    },
    mounted() {
    this.loading = true;
    ClientApi.getTransactionsById(this.id)
        .then((response) => {
        this.transactionModify = response.data;
        })
        .catch((error) => {
        console.error("Error al obtener la transacción:", error);
        })
        .finally(() => {
        this.loading = false;
        });
    },
    methods: {
      edit() {
        this.transactionModify.datetime = new Date();
        ClientApi.editTransaction(this.id, this.transactionModify)
            .then(() => {
            console.log("Transacción editada correctamente.");
            this.$store.commit("insertTransaction"); 
            this.$router.push("/history");
            })
            .catch((error) => {
            console.error("Error al editar la transacción:", error);
            });
     },
      cancel() {
        this.$router.push("/history");
      },
      getAgencies(crypto) {
        this.selectAgenciesDisabled = true;
        CryptoApi.getAgenciesInformation(crypto)
          .then((res) => {
            this.agencies = Object.keys(res.data).map((agency, index) => {
              return { agency: agency, values: Object.values(res.data)[index] };
            });
            this.selectAgenciesDisabled = false;
          })
          .catch(() => {
            console.error("Error al obtener agencias.");
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
  
  button.btn {
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
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
  