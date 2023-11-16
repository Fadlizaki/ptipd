import axios from "axios";

const ruangan = {
  namespaced: true,
  state: {
    dataruangan: [],
  },

  mutations: {
    SET_RUANGAN(state, ruangans) {
      state.dataruangan = ruangans;
    },
  },
  actions: {
    async fetchDataruangan({ commit }) {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-ruangan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_RUANGAN", response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDataruangan: (state) => state.dataruangan,
  },
};

export default ruangan;
