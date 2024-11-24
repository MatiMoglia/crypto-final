import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
  getCompraVentaCriptomoneda(exchange, coin) {
    return apiClient.get(`/${exchange}/${coin}/ars/0.01`);
  },
  getCriptomoneda() {
    return apiClient.get("/cryptomkt/btc/ars/0.21");
  },
  getPrecioMoneda(coin) {
    return apiClient.get(`/letsbit/${coin}`);
  },
  getAgenciesInformation(coin) {
    return apiClient.get(`/${coin}/ars/1`);
  },
  getPriceMoney(coin) {
    return apiClient.get(`/belo/${coin}`);
  },
};