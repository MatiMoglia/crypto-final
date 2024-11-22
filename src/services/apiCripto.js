import axios from "axios";

const apiCLient = axios.create({
  baseURL: "https://criptoya.com/api",
  withCredentials: false,
});

export default {
  getCompraVentaCriptomoneda(exchange, coin) {
    return apiCLient.get(`/${exchange}/${coin}/ars/0.01`);
  },
  getCriptomoneda() {
    return apiCLient.get("/cryptomkt/btc/ars/0.21");
  },
  getPrecioMoneda(coin) {
    return apiCLient.get(`/letsbit/${coin}`);
  },
  getAgenciesInformation(coin) {
    return apiCLient.get(`/${coin}/ars/1`);
  },
};