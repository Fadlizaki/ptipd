import axios from "axios";

const LMruangan = {
  namespaced: true,
  state: {
    dataruanganmain: [],
  },

  mutations: {
    SET_RUANGANMAIN(state, ruangand) {
      state.dataruanganmain = ruangand;
    },
  },
  actions: {
    async fetchDataruanganmain({ commit }) {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/jadwal-maintenance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_RUANGANMAIN", response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDataruanganmain: (state) => state.dataruanganmain,
  },
};

export default LMruangan;
