import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3", 
  withCredentials: false,
});

export default {
  getMarketData(currency = "ars", perPage = 100, page = 1) {
    return apiClient.get(`/coins/markets`, {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: perPage,
        page: page,
        sparkline: false,
      },
    });
  },
};
