import axios from "axios";

const ruangans = {
  namespaced: true,
  state: {
    dataruangan: [],
    ruanganTerpilih: null,
    editDataruangan: [],
    totalruangan: 0,
  },

  mutations: {
    SET_RUANGAN(state, ruangand) {
      state.dataruangan = ruangand;
    },
    ADD_RUANGAN(state, ruangan) {
      state.dataruangan.push(ruangan);
    },
    SET_RUANGAN_TERPILIH(state, ruangan) {
      state.ruanganTerpilih = ruangan;
    },
    UPDATE_RUANGAN(state, ruanganTerbaru) {
      try {
        state.editDataruangan = ruanganTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_RUANGAN(state, idruangan) {
      state.dataruangan = state.dataruangan.filter(
        (k) => k.id !== idruangan
      );
    },
    SET_TOTAL_RUANGAN(state, total) {
      state.totalruangan = total;
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

        commit("SET_RUANGAN", response.data['data']);
        commit("SET_TOTAL_RUANGAN", response.data["data"].length); // Tambahkan perintah commit untuk mengupdate total
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDataruangan({ commit }, ruanganData) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-ruangan",
          ruanganData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_RUANGAN", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihruangan({ commit }, ruangan) {
      commit("SET_RUANGAN_TERPILIH", ruangan);
    },
    async ubahDataruangan({ commit }, { ruanganId, formEditruangan }) {
      try {
        console.log(formEditruangan);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-ruangan/${ruanganId}`,
          formEditruangan,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_RUANGAN", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDataruangan({ commit }, idruangan) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-ruangan/${idruangan}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_RUANGAN", idruangan);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDataruangan: (state) => state.dataruangan,
    getruanganTerpilih: (state) => state.ruanganTerpilih,
    totalruangan: (state) => state.dataruangan.length,
  },
};

export default ruangans;
