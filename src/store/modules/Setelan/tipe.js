import axios from "axios";

const tipe = {
  namespaced: true,
  state: {
    datatipe: [],
    tipeTerpilih: null,
    editDatatipe: [],
  },
  mutations: {
    SET_TIPE(state, tipes) {
      state.datatipe = tipes;
    },
    ADD_TIPE(state, tipe) {
      state.datatipe.push(tipe);
    },
    SET_TIPETERPILIH(state, tipe) {
      state.tipeTerpilih = tipe;
    },
    UPDATE_TIPE(state, tipeTerbaru) {
      try {
        state.editDatatipe = tipeTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_TIPE(state, idtipe) {
      state.datatipe = state.datatipe.filter((k) => k.id !== idtipe);
    },
  },
  actions: {
    async fetchDataTipe({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/tipe-barang",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("SET_TIPE", response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDatatipe({ commit }, tipedata) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/tipe-barang",
          tipedata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_TIPE", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihtipe({ commit }, tipe) {
      commit("SET_TIPETERPILIH", tipe);
    },
    async ubahDatatipe({ commit }, { tipeId, formEdittipe }) {
      try {
        console.log(formEdittipe);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/tipe-barang/${tipeId}`,
          formEdittipe,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_TIPE", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDatatipe({ commit }, idtipe) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/tipe-barang/${idtipe}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_TIPE", idtipe);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    getDataTipe: (state) => state.datatipe,
    gettipeterpilih: (state) => state.tipeTerpilih,
  },
};

export default tipe;
