import { createStore } from 'vuex';

export default createStore({
  state: {
    idUser: "",
  },
  getters: {
    getIdUser: (state) => state.idUser,
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

