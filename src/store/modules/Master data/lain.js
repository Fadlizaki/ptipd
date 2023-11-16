import axios from "axios";

const barangLain = {
  // Mengubah "komputer" menjadi "barangLain"
  namespaced: true,
  state: {
    dataBarangLain: [], // Mengubah "dataKomputer" menjadi "dataBarangLain"
    barangLainTerpilih: null, // Mengubah "komputerTerpilih" menjadi "barangLainTerpilih"
    editDataBarangLain: [], // Tambahkan properti barangLainTerpilih untuk menyimpan item terpilih untuk diedit
  },
  mutations: {
    SET_BARANG_LAIN(state, barangLains) {
      console.log("Setting barangLains:", barangLains);
      state.dataBarangLain = barangLains;
    },
    ADD_BARANG_LAIN(state, barangLain) {
      // Mengubah "ADD_KOMPUTER" menjadi "ADD_BARANG_LAIN"
      state.dataBarangLain.push(barangLain); // Mengubah "dataKomputer" menjadi "dataBarangLain"
    },
    SET_BARANG_LAIN_TERPILIH(state, barangLain) {
      // Mengubah "SET_KOMPUTER_TERPILIH" menjadi "SET_BARANG_LAIN_TERPILIH"
      state.barangLainTerpilih = barangLain; // Mengubah "komputerTerpilih" menjadi "barangLainTerpilih"
    },
    UPDATE_BARANG_LAIN(state, barangLainTerbaru) {
      // Mengubah "UPDATE_KOMPUTER" menjadi "UPDATE_BARANG_LAIN"
      try {
        state.editDataBarangLain = barangLainTerbaru; // Mengubah "editDataKomputer" menjadi "editDataBarangLain"
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_BARANG_LAIN(state, idBarangLain) {
      // Mengubah "DELETE_KOMPUTER" menjadi "DELETE_BARANG_LAIN"
      state.dataBarangLain = state.dataBarangLain.filter(
        (l) => l.id !== idBarangLain // Mengubah "idKomputer" menjadi "idBarangLain"
      );
    },
  },
  actions: {
    async fetchDataBarangLain({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Menyaring data berdasarkan tipe_barang
        const barangLain = response.data["data"].filter(barang => {
          return barang.tipe_barang !== "Laptop" && barang.tipe_barang !== "Komputer";
        });
  
        commit("SET_BARANG_LAIN", barangLain);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    
    async tambahDataBarangLain({ commit }, barangLainData) {
      // Mengubah "tambahDataKomputer" menjadi "tambahDataBarangLain"
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/komputer?tipe=tipeBarangAnda",
          barangLainData, // Mengubah "komputerData" menjadi "barangLainData"
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        commit("ADD_BARANG_LAIN", response.data); // Mengubah "ADD_KOMPUTER" menjadi "ADD_BARANG_LAIN"
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihBarangLain({ commit }, barangLain) {
      // Mengubah "pilihKomputer" menjadi "pilihBarangLain"
      commit("SET_BARANG_LAIN_TERPILIH", barangLain); // Mengubah "SET_KOMPUTER_TERPILIH" menjadi "SET_BARANG_LAIN_TERPILIH"
    },

    async ubahDataBarangLain({ commit }, { idDataLain, formEditBarangLain }) {
      // Mengubah "ubahDataKomputer" menjadi "ubahDataBarangLain"
      try {
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer/${idDataLain}`,
          formEditBarangLain, // Mengubah "formEditKomputer" menjadi "formEditBarangLain"
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_BARANG_LAIN", response.data); // Mengubah "UPDATE_KOMPUTER" menjadi "UPDATE_BARANG_LAIN"
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDataBarangLain({ commit }, idBarangLain) {
      // Mengubah "hapusDataKomputer" menjadi "hapusDataBarangLain"
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer/${idBarangLain}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_BARANG_LAIN", idBarangLain); // Mengubah "DELETE_KOMPUTER" menjadi "DELETE_BARANG_LAIN"
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    getDataBarangLain: (state) => state.dataBarangLain, // Mengubah "getDataKomputer" menjadi "getDataBarangLain"
    getBarangLainTerpilih: (state) => state.barangLainTerpilih, // Mengubah "getKomputerTerpilih" menjadi "getBarangLainTerpilih"
  },
};

export default barangLain; // Mengubah "komputer" menjadi "barangLain"
