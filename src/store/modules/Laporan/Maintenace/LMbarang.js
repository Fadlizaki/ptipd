import axios from "axios";

const lmbarang = {
  namespaced: true,
  state: {
    databarangmain: [],
    
  },

  mutations: {
    SET_BARANGMAIN(state, barangd) {
      state.databarangmain = barangd;
    },
  },
  actions: {
    async fetchDatabarangmain({ commit }) {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/perbaikan-komputer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_BARANGMAIN", response.data["data"]);
        commit("SET_TOTAL_BARANGMAIN", response.data["data"].length); // Tambahkan perintah commit untuk mengupdate total
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    
  },

  getters: {
    getDatabarangmain: (state) => state.databarangmain,
   
  },
};

export default lmbarang;
