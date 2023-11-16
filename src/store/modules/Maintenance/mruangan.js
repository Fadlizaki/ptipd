import axios from "axios";

const mruangan = {
  namespaced: true,
  state: {
    dataruanganmain: [],
    ruanganmainTerpilih: null,
    editDataruanganmain: [],
    totalruanganmain: 0,
  },

  mutations: {
    SET_RUANGANMAIN(state, ruangand) {
      state.dataruanganmain = ruangand;
    },
    ADD_RUANGANMAIN(state, ruangan) {
      state.dataruanganmain.push(ruangan);
    },
    SET_RUANGANMAIN_TERPILIH(state, ruangan) {
      state.ruanganmainTerpilih = ruangan;
    },
    UPDATE_RUANGANMAIN(state, ruanganTerbaru) {
      try {
        state.editDataruanganmain = ruanganTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_RUANGANMAIN(state, idruanganmain) {
      state.dataruanganmain = state.dataruanganmain.filter(
        (k) => k.id !== idruanganmain
      );
    },
    SET_TOTAL_RUANGANMAIN(state, total) {
      state.totalruanganmain = total;
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

        commit("SET_RUANGANMAIN", response.data['data']);
        commit("SET_TOTAL_RUANGANMAIN", response.data["data"].length); // Tambahkan perintah commit untuk mengupdate total
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDataruanganmain({ commit }, ruanganmainData) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/jadwal-maintenance",
          ruanganmainData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_RUANGANMAIN", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihruanganmain({ commit }, ruangan) {
      commit("SET_RUANGANMAIN_TERPILIH", ruangan);
    },
    async ubahDataruanganmain({ commit }, { ruanganmainId, formEditruanganmain }) {
      try {
        console.log(formEditruanganmain);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/jadwal-maintenance/${ruanganmainId}`,
          formEditruanganmain,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_RUANGANMAIN", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDataruanganmain({ commit }, idruanganmain) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/jadwal-maintenance/${idruanganmain}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_RUANGANMAIN", idruanganmain);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDataruanganmain: (state) => state.dataruanganmain,
    getruanganmainTerpilih: (state) => state.ruanganmainTerpilih,
    totalruanganmain: (state) => state.dataruanganmain.length,
  },
};

export default mruangan;
