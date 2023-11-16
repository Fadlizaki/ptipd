import axios from 'axios';

const user = {
  namespaced: true,
  state: {
    datauser: [],
    userTerpilih: null,
    editDatauser: [],
    totaluser: 0,
  },
  mutations: {
    SET_USER(state, users) {
      state.datauser = users;
    },
    ADD_USER(state, user) {
      state.datauser.push(user);
    },
    SET_USERTERPILIH(state, user) {
      state.userTerpilih = user;
    },
    UPDATE_USER(state, userTerbaru) {
      try {
        state.editDatauser = userTerbaru;
      } catch (error) {
        console.error("Error while updating computer:", error);
      }
    },
    DELETE_USE(state, iduser) {
      state.datauser = state.datauser.filter(
        (k) => k.id !== iduser
      );
    },
    SET_TOTAL_USER(state, total) {
      state.totaluser = total;
    },
  
  },
  actions: {
    async fetchDatauser({ commit }) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('https://ptipd-lab-inventory-api-production.up.railway.app/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit('SET_USER', response.data["data"]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async tambahDatauser({ commit }, userdata) {
      try {
        const response = await axios.post(
          "https://ptipd-lab-inventory-api-production.up.railway.app/users/register",
          userdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_USER", response.data);
        commit("SET_TOTAL_USER", response.data["data"].length); // Tambahkan perintah commit untuk mengupdate total
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    pilihuser({ commit }, user) {
      commit("SET_USERTERPILIH", user);
    },
    async ubahDatauser({ commit }, { userId, formEdituser }) {
      try {
        console.log(formEdituser);
        const response = await axios.put(
          `https://ptipd-lab-inventory-api-production.up.railway.app/users/reset-password/${userId}`,
          formEdituser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("UPDATE_USER", response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async hapusDatauser({ commit }, iduser) {
      try {
        await axios.delete(`https://ptipd-lab-inventory-api-production.up.railway.app/users/${iduser}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        commit("DELETE_USE", iduser);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    
  },
  getters: {
    getDatauser: (state) => state.datauser,
    getuserterpilih: (state) => state.userTerpilih,
    totaluser: (state) => state.datauser.length,
  },
};

export default user;