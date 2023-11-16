import axios from "axios";

const komputer = {
  namespaced: true,
  state: {
    dataKomputer: [],
    komputerTerpilih: null,
    editDataKomputer: [],
    totalComputers: 0,
  },

  mutations: {
    SET_KOMPUTER(state, komputers) {
      state.dataKomputer = komputers;
    },
    ADD_KOMPUTER(state, komputer) {
      state.dataKomputer.push(komputer);
    },
    SET_KOMPUTER_TERPILIH(state, komputer) {
      state.komputerTerpilih = komputer;
    },
    UPDATE_KOMPUTER(state, komputerTerbaru) {
      try {
        state.editDataKomputer = komputerTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_KOMPUTER(state, idKomputer) {
      state.dataKomputer = state.dataKomputer.filter(
        (k) => k.id !== idKomputer
      );
    },
    SET_TOTAL_COMPUTERS(state, total) {
      state.totalComputers = total;
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
        commit("SET_TOTAL_COMPUTERS", response.data["data"].length); // Tambahkan perintah commit untuk mengupdate total
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDataKomputer({ commit }, komputerData) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/komputer",
          komputerData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_KOMPUTER", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihKomputer({ commit }, komputer) {
      commit("SET_KOMPUTER_TERPILIH", komputer);
    },
    async ubahDataKomputer({ commit }, { komputerId, formEditKomputer }) {
      try {
        console.log(formEditKomputer);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer/${komputerId}`,
          formEditKomputer,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_KOMPUTER", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDataKomputer({ commit }, idKomputer) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer/${idKomputer}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_KOMPUTER", idKomputer);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDataKomputer: (state) => state.dataKomputer,
    getKomputerTerpilih: (state) => state.komputerTerpilih,
    totalComputers: (state) => state.dataKomputer.length,
  },
};

export default komputer;
