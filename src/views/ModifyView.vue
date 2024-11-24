<template>
    <div class="body">
      <div class="new">
        <div v-if="loading" class="loader"></div>
        <form v-if="!loading" @submit.prevent>
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
  