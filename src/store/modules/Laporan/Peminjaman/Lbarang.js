import axios from "axios";

const barang = {
  namespaced: true,
  state: {
    databarang: [],
  },

  mutations: {
    SET_BARANG(state, barangs) {
      state.databarang = barangs;
    },
  },
  actions: {
    async fetchDatabarang({ commit }) {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-barang?jenis=",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_BARANG", response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDatabarang: (state) => state.databarang,
  },
};

export default barang;
