import axios from "axios";
import store from "../store";

const apiClient = axios.create({
  baseURL: "https://labor3-d60e.restdb.io/rest/",
  headers: { 'x-apikey': "64a2e9bc86d8c525a3ed8f63" },
});

export default {
    getTransactions(idUser) {
        return apiClient.get(`/transactions?q={"user_id": "${idUser}"}`);
    },
    getTransactionsById(id) {
        return apiClient.get(`/transactions/${id}`);
    },
    newTransaction(transaction) {
        return apiClient.post("/transactions", transaction);
    },
    editTransaction(id, transactionModify) {
        return apiClient.patch(`/transactions/${id}`, transactionModify)
        .then(response => {
            const updatedTransaction = response.data;
            store.commit("updateTransaction", updatedTransaction);
        });
    },
    deleteTransaction(id) {
        return apiClient.delete(`/transactions/${id}`)
        .then(() => {
            store.commit("deleteTransaction", id);
        });
    },
};