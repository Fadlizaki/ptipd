<template>
  <v-app>
    <v-main>
      <!-- Menampilkan SidebarComponent hanya jika pengguna terautentikasi -->
      <sidebar-component v-if="isAuthenticated" />

      <router-view :is-authenticated="isAuthenticated" />

      <!-- Menampilkan FooterComponent hanya jika pengguna terautentikasi -->
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <foother-component v-if="isAuthenticated" />
    </v-main>
  </v-app>
</template>

<script>
import SidebarComponent from "./components/SidebarComponents.vue";
import footherComponent from "./components/footerComponents.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    SidebarComponent,
    footherComponent,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  created() {
    const token = localStorage.getItem("token");
  if (token) {
    this.$store.commit("auth/SET_TOKEN", token);
    this.$store.commit("auth/SET_AUTHENTICATED", true);
  }

  if (this.isAuthenticated) {
    this.$router.push('/home'); // Jika pengguna terotentikasi, arahkan ke halaman beranda
  }
  },
};
</script>