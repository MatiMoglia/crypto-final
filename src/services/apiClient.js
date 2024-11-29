import axios from "axios";
import store from "@/store";

const clienteAPI = axios.create({
  baseURL: "https://labor3-d60e.restdb.io/rest/",
  headers: { 'x-apikey': "64a2e9bc86d8c525a3ed8f63" },
});

export default {
    getTransactions(idUser) {
        return clienteAPI.get(`/transactions?q={"user_id": "${idUser}"}`);
    },
    getTransactionsById(id) {
        return clienteAPI.get(`/transactions/${id}`);
    },
    newTransaction(buySale) {
        return clienteAPI.post("/transactions", buySale);
    },
    editTransaction(id, transactionModify) {
        return clienteAPI.patch(`/transactions/${id}`, transactionModify)
        .then(response => {
            const updatedTransaction = response.data;
            store.commit("updateTransaction", updatedTransaction);
        });
    },
    deleteTransaction(id) {
        return clienteAPI.delete(`/transactions/${id}`)
        .then(() => {
            store.commit("deleteTransaction", id);
        });
    },
};