<template>
    <div class="sale">
        <form action="#" method="post">
            <div class="criptos">
                <div class="select">
                    <select id="crypto-select" v-model="buySale.crypto_code" @change="getAgencies(buySale.crypto_code)">
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
                        id="agency-select" 
                        v-model="selectedAgency" 
                        @change="enableAmount()" 
                        :disabled="selectAgenciesDisabled">
                        <option value="" disabled selected hidden>SELECCIONAR AGENCIA</option>
                        <option v-for="agency in agencies" 
                                :key="agency.agency" 
                                :value="agency">
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

            if (!this.buySale.crypto_amount) {
                this.$toast.error("Ingrese la cantidad a vender");
            } else if (!parseFloat(this.buySale.crypto_amount)) {
                this.$toast.error("Debe ingresar un valor numérico");
            } else if (parseFloat(this.buySale.crypto_amount) <= 0) {
                this.$toast.error("La cantidad debe ser mayor a 0");
            } else if (!this.buySale.money) {
                this.$toast.error("El campo de importe no debe estar vacío");
            } else if (!parseFloat(this.buySale.money)) {
                this.$toast.error("Debe ingresar un valor numérico en importe");
            } else if (parseFloat(this.buySale.money) <= 0) {
                this.$toast.error("El importe debe ser mayor a 0");
            } else if (!this.buySale.crypto_code) {
                this.$toast.error("Debe seleccionar una criptomoneda");
            } else {
                const cryptoBalance = this.getAmountInWallet(this.buySale.crypto_code);

                if (parseFloat(this.buySale.crypto_amount) <= cryptoBalance) {
                    this.buySale.datetime = new Date();
                    this.buySale.datetime.setHours(this.buySale.datetime.getHours() - 3);

                    ClientApi.newTransaction(this.buySale)
                        .then(() => {
                            this.$toast.info("Venta realizada con éxito");
                            this.$store.commit("insertTransaction");
                            this.resetForm();
                        })
                        .catch(() => {
                            this.$toast.error("Error al realizar la venta");
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    this.$toast.error("No tienes suficientes criptomonedas para realizar esta venta");
                }
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
                .catch(() => {
                    this.$toast.error("Error al obtener las agencias");
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
</style>
