import axios from "axios";

const peminjambarang = {
  namespaced: true,
  state: {
    datapinjambarang: [],
    pinjambarangTerpilih: null,
    editDatapinjambarang: [],
    totalpinjambarang: 0,
  },

  mutations: {
    SET_PINJAMBARANG(state, barangd) {
      state.datapinjambarang = barangd;
    },
    ADD_PINJAMBARANG(state, barang) {
      state.datapinjambarang.push(barang);
    },
    SET_PINJAMBARANG_TERPILIH(state, barang) {
      state.pinjambarangTerpilih = barang;
    },
    UPDATE_PINJAMBARANG(state, barangTerbaru) {
      try {
        state.editDatapinjambarang = barangTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_PINJAMBARANG(state, idbarang) {
      state.datapinjambarang = state.datapinjambarang.filter(
        (k) => k.id !== idbarang
      );
    },
    SET_TOTAL_PINJAMBARANG(state, total) {
      state.totalpinjambarang = total;
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

        commit("SET_PINJAMBARANG", response.data['data']);
        commit("SET_TOTAL_PINJAMBARANG", response.data["data"].length); // Tambahkan perintah commit untuk mengupdate total
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDatabarang({ commit }, barangData) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-barang",
          barangData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_PINJAMBARANG", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihbarang({ commit }, barang) {
      commit("SET_PINJAMBARANG_TERPILIH", barang);
    },
    async ubahDatabarang({ commit }, { barangId, formEditbarang }) {
      try {
        console.log(formEditbarang);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-barang/${barangId}`,
          formEditbarang,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_PINJAMBARANG", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDatabarang({ commit }, idbarang) {
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/peminjaman-barang/${idbarang}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_PINJAMBARANG", idbarang);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },

  getters: {
    getDatabarang: (state) => state.datapinjambarang,
    getbarangTerpilih: (state) => state.pinjambarangTerpilih,
    totalpinjambarang: (state) => state.datapinjambarang.length,
  },
};

export default peminjambarang;
