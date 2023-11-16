import axios from "axios";

const mbarang = {
  namespaced: true,
  state: {
    databarangmain: [],
    barangmainTerpilih: null,
    editDatabarangmain: [],
    totalbarangmain: 0,
  },

  mutations: {
    SET_BARANGMAIN(state, barangd) {
      state.databarangmain = barangd;
    },
    ADD_BARANGMAIN(state, barang) {
      state.databarangmain.push(barang);
    },
    SET_BARANGMAIN_TERPILIH(state, barang) {
      state.barangmainTerpilih = barang;
    },
    UPDATE_BARANGMAIN(state, barangTerbaru) {
      try {
        state.editDatabarangmain = barangTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_BARANGMAIN(state, idbarangmain) {
      state.databarangmain = state.databarangmain.filter(
        (k) => k.id !== idbarangmain
      );
    },
    SET_TOTAL_BARANGMAIN(state, total) {
      state.totalbarangmain = total;
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
    async tambahDatabarangmain({ commit }, barangmainData) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/perbaikan-komputer",
          barangmainData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_BARANGMAIN", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihbarangmain({ commit }, barang) {
      commit("SET_BARANGMAIN_TERPILIH", barang);
    },
    async ubahDatabarangmain({ commit }, { barangmainId, formEditbarangmain }) {
      try {
        console.log(formEditbarangmain);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/perbaikan-komputer/${barangmainId}`,
          formEditbarangmain,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_BARANGMAIN", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDatabarangmain({ commit }, idbarangmain) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/perbaikan-komputer/${idbarangmain}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_BARANGMAIN", idbarangmain);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDatabarangmain: (state) => state.databarangmain,
    getbarangmainTerpilih: (state) => state.barangmainTerpilih,
    totalbarangmain: (state) => state.databarangmain.length,
  },
};

export default mbarang;
