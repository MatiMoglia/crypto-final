<template>
    <div class="body">
        <Navbar/>
        <div class="history">
            <div class="container">
                <div v-if="loading" class="loader"></div>
                <table v-if="!loading">
                    <thead>
                        <tr>
                            <th>CRIPTOMONEDA</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>TIPO DE OPERACION</th>
                            <th>FECHA DE OPERACION</th>
                            <th>EDICION | BORRADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="transaction in sortedTransactions" 
                            :key="transaction._id" :class="{ selected: selectRow === transaction._id }">
                            <td class="row">{{ nameCriptos(transaction.crypto_code) }}</td>
                            <td class="row">{{ transaction.crypto_amount }}</td>
                            <td class="row"> $ {{ transaction.money }}</td>
                            <td class="row">{{ typeAction(transaction.action) }}</td>
                            <td class="row">{{ time(transaction.datetime) }}</td>
                            <td>
                                <router-link
                                    :to="{
                                        name: 'Modify',
                                        query: {
                                            id: selectRow,
                                        },
                                    }"
                                >
                                    <span class="icon" 
                                    @click="edit(transaction._id)"
                                    >
                                        <ion-icon name="create"></ion-icon>
                                    </span>
                                </router-link>
                                <span class="icon" 
                                @click="deleteRow(transaction._id)"
                                >
                                    <ion-icon name="trash">
                                </ion-icon></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!loading && sortedTransactions.length === 0">La tabla está vacía.</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientApi from '@/services/apiClient.js';
import Navbar from "@/components/NavBar.vue";
export default {
    name: "History",
    components: { Navbar },
    data() {
        return {
            selectRow: null,
            loading: false,
        };
    },
    computed:{
        ...mapGetters({
            transactions: "getTransactions",
        }),
        sortedTransactions() {
            return [...this.transactions].sort((a, b) => {
                return new Date(b.datetime) - new Date(a.datetime);
            });
        },
    },
    methods: {
        edit(id){
            if(this.selectRow !== id){
                this.selectRow = id;
                console.log(this.selectRow)
            }else{
                this.selectRow = null;
            }
        },
        deleteRow(id){
            this.loading = true;

            if(confirm("Está seguro que desea eliminar esta transacción?")) {
                ClientApi.deleteTransaction(id)
                .then(() => {
                    this.$toast.info("Eliminado con exito");
                })
                .catch(() => {
                    this.$toast.error("Error al Eliminar la Transacción");
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        nameCriptos(crypto_code) {
            if (crypto_code == "btc")
                return "Bitcoin";
            if (crypto_code == "eth")
                return "Ethereum";
            if (crypto_code == "usdt")
                return "Theter";
            if (crypto_code == "usdc")
                return "USD Coin";
            if (crypto_code == "dai")
                return "Dai";
        },
        typeAction(action) {
            if (action === "purchase") {
                return "Compra";
            }
            else {
                return "Venta";
            }
        },
        time(datetime) {
            return datetime.slice(0, 10) + " " + datetime.slice(11, 16) + "Hs";
        },
    },
}
</script>