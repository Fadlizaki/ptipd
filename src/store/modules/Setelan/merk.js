import axios from "axios";

const merk = {
  namespaced: true,
  state: {
    datamerk: [],
    merkTerpilih: null,
    editDatamerk: [],
  },
  mutations: {
    SET_MERK(state, merks) {
      state.datamerk = merks;
    },
    ADD_MERK(state, merk) {
      state.datamerk.push(merk);
    },
    SET_MERKTERPILIH(state, merk) {
      state.merkTerpilih = merk;
    },
    UPDATE_MERK(state, merkTerbaru) {
      try {
        state.editDatamerk = merkTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_MERK(state, idmerk) {
      state.datamerk = state.datamerk.filter((k) => k.id !== idmerk);
    },
  },
  actions: {
    async fetchDataMerk({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/merk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("SET_MERK", response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDatamerk({ commit }, merkdata) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/merk",
          merkdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_MERK", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihmerk({ commit }, merk) {
      commit("SET_MERKTERPILIH", merk);
    },
    async ubahDatamerk({ commit }, { merkId, formEditmerk }) {
      try {
        console.log(formEditmerk);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/merk/${merkId}`,
          formEditmerk,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_MERK", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDatamerk({ commit }, idmerk) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/merk/${idmerk}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_MERK", idmerk);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    getDataMerk: (state) => state.datamerk,
    getmerkterpilih: (state) => state.merkTerpilih,
  },
};

export default merk;
