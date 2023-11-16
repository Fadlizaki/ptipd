import axios from "axios";
import router from "../../router"; // Sesuaikan jalur impor ini dengan struktur proyek Anda

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    username: localStorage.getItem("username") || "",

    loginError: null,
    isAuthenticated: false,
    response: null,
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const loginUrl =
          "https://ptipd-lab-inventory-api-production.up.railway.app/users/login";
        const response = await axios.post(loginUrl, credentials);
        const token = response.data.data.token;
        const username = response.data.data.profile.name;
        const email = response.data.data.profile.email;

        // Setelah pengguna berhasil login
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        commit("SET_TOKEN", token);
        commit("SET_LOGIN_ERROR", null);
        commit("SET_AUTHENTICATED", true);

        console.log("Login Successful"); // Tambahkan log ini

        router.push("/home"); // Tambahkan log ini
        return true;
      } catch (error) {
        const errorMessage = error.response.data.message || "Login Failed";
        commit("SET_LOGIN_ERROR", errorMessage);
        console.error(error);
        return false;
      }
    },
    async register({ commit }, credentials) {
      try {
        const registerUrl =
          "https://ptipd-lab-inventory-api-production.up.railway.app/users/register";
        const responseRegister = await axios.post(registerUrl, credentials);
        const responseAlert = responseRegister.data.data.message;
        alert(responseAlert);

        router.push("/login");
        commit("SET_RESPONSE_REGISTER", responseAlert);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      commit("SET_TOKEN", "");
      commit("SET_AUTHENTICATED", false);
      console.log("Token Removed");
      router.push("/login"); // Arahkan pengguna ke halaman login setelah logout
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error;
    },
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_RESPONSE_REGISTER(state, res) {
      state.response = res;
    },
  },
};

export default auth;
