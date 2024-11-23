<template>
    <div class="body">
        <div class="new">
            <div v-if="loading" class="loader"></div>
            <form v-if="!loading" action="#" method="post">
                <div class="criptos">
                    <div class="select">
                        <select id="standard-select" v-model="transactionModify.crypto_code" @change="getAgencies(transactionModify.crypto_code)">
                            <option value="" disabled selected hidden>CRIPTOMONEDA</option>
                            <option value="btc">BITCOIN</option>
                            <option value="eth">ETHEREUM</option>
                            <option value="usdt">THETER</option>
                            <option value="usdc">USD COIN</option>
                            <option value="dai">DAI</option>
                        </select>
                        <i></i>
                    </div>
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
                            {{ agency.agency.toUpperCase() + " - PRECIO: " + agency.values.totalAsk }}
                        </option>
                    </select>
                    <i></i>
                </div>
                <div class="cantCompra">
                    <input type="number" id="cantBuy" name="cantBuy" v-model="transactionModify.crypto_amount" placeholder="CANTIDAD A COMPRAR" required
                    @input="calculateAmount()">
                </div>
                <div class="pagoModi">
                    <input type="number" id="amount" name="amount" v-model="transactionModify.money" placeholder="IMPORTE $" required disabled>
                </div>
                <div class="select">
                    <select id="standard-select" v-model="transactionModify.action">
                        <option value="">TRANSACCION</option>
                        <option value="purchase">COMPRAR</option>
                        <option value="sale">VENDER</option>
                    </select>
                    <i></i>
                </div>
                <button class="btn" type="submit" @click.prevent="edit">GUARDAR</button>
                <button class="btn" type="submit" @click.prevent="cancel">CANCELAR</button>
            </form>
        </div>
    </div>
</template>

<script>
    import ClientApi from "@/services/apiClient";
    import CryptoApi from "@/services/apiCripto";
    export default {
        name:"Modify",
        data(){
            return {
                transactionModify:{
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
            }
        },
        computed:{
            id(){
                return this.$route.query.id;
            }
        },
        mounted(){
            this.loading = true;

            ClientApi.getTransactionsById(this.id)
            .then((response) => {
            this.transactionModify = response.data;
            }).catch(() => {
                this.$toast.error("Error");
            }).finally(() => {
                this.loading = false;
            });
        },
        methods:{
            edit(){
                this.transactionModify.datetime = new Date();
                ClientApi.editTransaction(this.id, this.transactionModify)
                .then(() => {
                    this.$toast.info("Editado correctamente");
                    this.$store.commit("insertTransactions");
                    this.$router.push("/history");
                })
                .catch(() => {
                    this.$toast.error("Error al Editar Transacción");
                });
            },
            cancel(){
                this.$router.push("/history");
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
                this.transactionModify.money = (
                    this.transactionModify.crypto_amount * this.selectedAgency.values.totalAsk
                ).toFixed(2);
            },
        },
    }
</script>
