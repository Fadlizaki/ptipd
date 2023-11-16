import axios from "axios";

const komputer = {
  namespaced: true,
  state: {
    dataKomputer: [],
  },

  mutations: {
    SET_KOMPUTER(state, komputers) {
      state.dataKomputer = komputers;
    },
  },
  actions: {
    async fetchDataKomputer({ commit }) {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/komputer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_KOMPUTER", response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDataKomputer: (state) => state.dataKomputer,
  },
};

export default komputer;
