<template>
    <div class="purchase">
        <form action="#" method="post">
            <div class="criptos">
                <div class="select">
                    <select id="standard-select" v-model="buySale.crypto_code" @change="getAgencies(buySale.crypto_code)">
                        <option value="" disabled selected hidden>CRIPTOMONEDA</option>
                        <option value="btc">BITCOIN</option>
                        <option value="eth">ETHEREUM</option>
                        <option value="usdt">THETHER</option>
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
                        :disabled="selectAgenciesDisabled">
                        <option value="" disabled selected hidden>SELECCIONAR AGENCIA</option>
                        <option v-for="agency in agencies" :key="agency.agency" :value="agency">
                            {{ agency.agency.toUpperCase() + " - Precio: " + agency.values.totalBid }}
                        </option>
                    </select>
                    <i></i>
                </div>
            </div>

            <div class="cantVenta">
                <input 
                    type="number" 
                    min="0" 
                    id="cantSale" 
                    name="cantBuy" 
                    v-model="buySale.crypto_amount" 
                    placeholder="CANTIDAD A VENDER" 
                    required 
                    :disabled="setAmountDisabled"
                    @input="calculateAmount()">
            </div>

            <div class="pagoVenta">
                <input 
                    type="number" 
                    id="amount" 
                    name="amount" 
                    v-model="buySale.money" 
                    placeholder="IMPORTE $" 
                    required 
                    disabled>
            </div>

            <button class="btn" type="submit" @click.prevent="saleCripto">
                <span v-if="!loading">VENDER</span>
                <div v-if="loading" class="loader"></div>
            </button>
        </form>
    </div>
</template>

<script>
import ClientApi from "@/services/apiClient";
import CryptoApi from "@/services/apiCripto";
import { mapGetters } from "vuex";

export default {
    name: "FormSale",
    data() {
        return {
            loading: false,
            buySale: {
                user_id: this.$store.state.idUser,
                action: "sale",
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
    computed: {
        ...mapGetters({
            wallet: "getCurrentStatus",
        }),
    },
    methods: {
        saleCripto() {
            this.loading = true;

            // Validaciones y mensajes
            if (!this.buySale.crypto_amount) {
                alert("Ingrese la cantidad a vender");
            } else if (!parseFloat(this.buySale.crypto_amount)) {
                alert("Debe ingresar un valor numérico");
            } else if (parseFloat(this.buySale.crypto_amount) <= 0) {
                alert("La cantidad debe ser mayor a 0");
            } else if (!this.buySale.money) {
                alert("El campo de importe no debe estar vacío");
            } else if (!parseFloat(this.buySale.money)) {
                alert("Debe ingresar un valor numérico en importe");
            } else if (parseFloat(this.buySale.money) <= 0) {
                alert("El importe debe ser mayor a 0");
            } else if (!this.buySale.crypto_code) {
                alert("Debe seleccionar una criptomoneda");
            } else {
                const cryptoBalance = this.getAmountInWallet(this.buySale.crypto_code);

                if (parseFloat(this.buySale.crypto_amount) <= cryptoBalance) {
                    this.buySale.datetime = new Date();
                    this.buySale.datetime.setHours(this.buySale.datetime.getHours() - 3);

                    ClientApi.newTransaction(this.buySale)
                        .then(() => {
                            alert("Venta realizada con éxito");
                            this.$store.commit("insertTransaction");
                            this.resetForm();
                        })
                        .catch(() => {
                            alert("Error al realizar la venta");
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    alert("No tienes suficientes criptomonedas para realizar esta venta");
                }
            }

            this.loading = false; // Asegura que loading se desactive
        },
        getAgencies(crypto) {
            CryptoApi.getAgenciesInformation(crypto)
                .then((res) => {
                    this.agencies = Object.keys(res.data).map((agency, index) => {
                        return { agency: agency, values: Object.values(res.data)[index] };
                    });
                    this.selectAgenciesDisabled = false;
                })
                .catch(() => {
                    alert("Error al obtener las agencias");
                });
        },
        enableAmount() {
            this.setAmountDisabled = false;
        },
        calculateAmount() {
            this.buySale.money = (
                this.buySale.crypto_amount * this.selectedAgency.values.totalBid
            ).toFixed(2);
        },
        getAmountInWallet(crypto_code) {
            const inWallet = this.wallet.find((entry) => entry.crypto_code === crypto_code);
            return inWallet ? parseFloat(inWallet.crypto_amount) : 0;
        },
        resetForm() {
            this.buySale.crypto_code = "";
            this.buySale.crypto_amount = "";
            this.buySale.money = "";
            this.selectedAgency = "";
            this.selectAgenciesDisabled = true;
            this.setAmountDisabled = true;
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
.cantVenta, .pagoVenta {
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
