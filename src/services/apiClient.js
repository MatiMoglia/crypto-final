import axios from "axios";

const apiCLient = axios.create({
    baseURL: "https://labor3-d60e.restdb.io/rest/",
    headers: { 'x-apikey': "64a2e9bc86d8c525a3ed8f63" },
});

export default {
    getTransacciones(idUsuario) {
        return apiCLient.get(`/transactions?q={"user_id": "${idUsuario}"}`);
    },
    getTransaccionesById(id) {
        return apiCLient.get(`/transactions/${id}`);
    },

    ingresarNuevaTransaccion(nuevaTransaccion) {
        return apiCLient.post("/transactions", nuevaTransaccion);
    },
    modificarTransaccion(id, transaccionEditada) {
        return apiCLient.put(`/transactions/${id}`, transaccionEditada);
    },
    eliminarTransaccion(id) {
        return apiCLient.delete(`/transactions/${id}`);
    },
};