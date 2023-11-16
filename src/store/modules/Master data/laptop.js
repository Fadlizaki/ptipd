import axios from "axios";

const laptop = {
  namespaced: true,
  state: {
    dataLaptop: [], // Mengubah properti dataKomputer menjadi dataLaptop
    laptopTerpilih: null, // Mengubah properti komputerTerpilih menjadi laptopTerpilih
    editDataLaptop: [], // Mengubah properti editDataKomputer menjadi editDataLaptop
  },
  mutations: {
    SET_LAPTOP(state, laptops) {
      // Mengubah SET_KOMPUTER menjadi SET_LAPTOP
      state.dataLaptop = laptops;
    },
    ADD_LAPTOP(state, laptop) {
      // Mengubah ADD_KOMPUTER menjadi ADD_LAPTOP
      state.dataLaptop.push(laptop);
    },
    SET_LAPTOP_TERPILIH(state, laptop) {
      // Mengubah SET_KOMPUTER_TERPILIH menjadi SET_LAPTOP_TERPILIH
      state.laptopTerpilih = laptop;
    },
    UPDATE_LAPTOP(state, laptopTerbaru) {
      // Mengubah UPDATE_KOMPUTER menjadi UPDATE_LAPTOP
      try {
        state.editDataLaptop = laptopTerbaru; // Mengubah editDataKomputer menjadi editDataLaptop
      } catch (error) {
        console.error("Error while updating laptop:", error); // Mengubah pesan error
      }
    },
    DELETE_LAPTOP(state, idLaptop) {
      // Mengubah DELETE_KOMPUTER menjadi DELETE_LAPTOP
      state.dataLaptop = state.dataLaptop.filter(
        (l) => l.id !== idLaptop // Mengubah k menjadi l (laptop)
      );
    },
  },
  actions: {
    async fetchDataLaptop({ commit }) {
      // Mengubah fetchDataKomputer menjadi fetchDataLaptop
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
          "https://ptipd-lab-inventory-api-production.up.railway.app/komputer?tipe=Laptop",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        commit("SET_LAPTOP", response.data["data"]); // Mengubah SET_KOMPUTER menjadi SET_LAPTOP
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDataLaptop({ commit }, laptopData) {
      // Mengubah tambahDataKomputer menjadi tambahDataLaptop
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/komputer",
          laptopData, // Mengubah komputerData menjadi laptopData
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_LAPTOP", response.data); // Mengubah ADD_KOMPUTER menjadi ADD_LAPTOP
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihLaptop({ commit }, laptop) {
      // Mengubah pilihKomputer menjadi pilihLaptop
      commit("SET_LAPTOP_TERPILIH", laptop); // Mengubah SET_KOMPUTER_TERPILIH menjadi SET_LAPTOP_TERPILIH
    },
    async ubahDataLaptop({ commit }, { laptopId, formEditLaptop }) {
      // Mengubah ubahDataKomputer menjadi ubahDataLaptop
      try {
        console.log(formEditLaptop);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer/${laptopId}`, // Mengubah komputerId menjadi laptopId
          formEditLaptop, // Mengubah formEditKomputer menjadi formEditLaptop
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_LAPTOP", response.data); // Mengubah UPDATE_KOMPUTER menjadi UPDATE_LAPTOP
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDataLaptop({ commit }, idLaptop) {
      // Mengubah hapusDataKomputer menjadi hapusDataLaptop
      try {
        await axios.delete(
          `https://ptipd-lab-inventory-api-production.up.railway.app/komputer/${idLaptop}`,
          {
            // Mengubah idKomputer menjadi idLaptop
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("DELETE_LAPTOP", idLaptop); // Mengubah DELETE_KOMPUTER menjadi DELETE_LAPTOP
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    getDataLaptop: (state) => state.dataLaptop, // Mengubah getDataKomputer menjadi getDataLaptop
    getLaptopTerpilih: (state) => state.laptopTerpilih, // Mengubah getKomputerTerpilih menjadi getLaptopTerpilih
  },
};

export default laptop;
