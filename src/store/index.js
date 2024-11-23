import { createStore } from 'vuex';

export default createStore({
  state: {
    idUser: "",
  },
  getters: {
    getIdUser: (state) => state.idUser,
    getCurrentStatus(state) {
      return state.wallet || []; 
    },
  },
  mutations: {
    modificarIdUsuario(state, idUser) {
      state.idUser = idUser;
    },
  },
  actions: {
  },
  modules: {
  },
});

