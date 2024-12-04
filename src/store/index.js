import { createStore } from 'vuex';
import ClientApi from '../services/apiTransactions.js';

export default createStore({
  state: {
    idUser: "",
    transactions: [],
  },
  getters: {
    getTransactions: (state) => {
      return state.transactions;
    },
    getCurrentStatus: (state) => {
      const wallet = [];
    
      state.transactions.forEach((transaction) => {
        const { crypto_code, crypto_amount, money, action } = transaction;
        if (!crypto_code || isNaN(crypto_amount) || isNaN(money)) return;

        const index = wallet.findIndex((item) => item.crypto_code === crypto_code);
        const amountChange = action === "sale" ? -parseFloat(crypto_amount) : parseFloat(crypto_amount);
        const moneyChange = action === "sale" ? -parseFloat(money) : parseFloat(money);
    
        if (index === -1) {
          wallet.push({ crypto_code, crypto_amount: amountChange, money: moneyChange });
        } else {
          wallet[index].crypto_amount += amountChange;
          wallet[index].money += moneyChange;
        }
      });
    
      return wallet;
    },
  },
  mutations: {
    newUser(state, idUser) {
      state.idUser = idUser;
    },
    insertTransaction(state){
      ClientApi.getTransactions(state.idUser)
      .then((response) => {
        state.transactions = response.data;
      }).catch(() => {
        alert("Error");
      });
    },
    deleteTransaction(state, transactionId) {
      state.transactions = state.transactions.filter(transaction => transaction._id !== transactionId);
    },
    updateTransaction(state, updatedTransaction) {
      const index = state.transactions.findIndex(transaction => transaction._id === updatedTransaction._id);
      if (index !== -1) {
        state.transactions.splice(index, 1, updatedTransaction);
      }
    },
  }
});
