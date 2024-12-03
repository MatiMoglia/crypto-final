import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
    getAgenciesInformation(coin) {
      return apiClient.get(`/${coin}/ars/1`);
    },
    getPriceMoney(coin) {
      return apiClient.get(`/satoshitango/${coin}`);
    },
};