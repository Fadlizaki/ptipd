<template>
  <v-container fluid class="bg-container">
    <v-card
      class="mx-auto px-5 py-8 rounded-xl my-16"
      min-width="300"
      max-width="400"
    >
      <v-form @submit.prevent="performLogin">
        <v-img
          class="mx-auto"
          max-width="400"
          src="../assets/PTIPD.png"
        ></v-img>

        <v-card-title
          class="text-center text-h4 mt-3 font-palaquin-dark"
          style="color: #3784b4"
        >
          Log in
        </v-card-title>

        <v-card-text class="mt-3">
          <div class="text-subtitle-1 font-palaquin-dark">Email</div>

          <v-text-field
            v-model="email"
            id="email"
            class="rounded-lg"
            density="compact"
            variant="tonal"
            placeholder="login@gmail.com"
            :rules="[required]"
            bg-color="blue-lighten-5"
          ></v-text-field>

          <div
            class="text-subtitle-1 d-flex align-center justify-space-between font-palaquin-dark"
          >
            Password

            <a
              class="text-caption text-decoration-none text-black"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
            Lupa kata sandi masuk?</a
            >
          </div>

          <v-text-field
            v-model="password"
            id="password"
            class="rounded-lg"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.counter]"
            clearable
            counter
            density="compact"
            placeholder="**************"
            variant="tonal"
            bg-color="blue-lighten-5"
            :type="show1 ? 'text' : 'password'"
            @click:append-inner="show1 = !show1"
          ></v-text-field>
        </v-card-text>

        <center>
          <v-btn
            width="150"
            style="background-color: #a4e75d"
            size="large"
            type="submit"
            @click="performLogin"
            variant="elevated"
          >
            <span style="color: #ffff"
              >LOGIN
              <v-icon dark right> mdi-arrow-right </v-icon>
            </span>
          </v-btn>
        </center>

        <v-card-subtitle class="text-center mt-5" 
          ><a href="/register"> Belum punya akun?</a>
          </v-card-subtitle
        >
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
export default {
 data: () => ({
  email: '',
  password: '',
  show1: false,
  rules: {
    required: (value) => !!value || "Wajib Di isi",
    // counter: (value) => value.length <= 8 || "Max 20 characters",
  },
}),
computed: {
    ...mapGetters('auth', ['loginError', 'isAuthenticated']),
  },
    methods: {
    ...mapActions('auth', ['login']),
    async performLogin() {
  const credentials = {
    email: this.email,
    password: this.password,
  };

  const success = await this.login(credentials);

  if (success && this.isAuthenticated) {
    this.$router.push('/home');
  } else {
    if (this.loginError) {
      alert(this.loginError);
    } else {
      alert('Login Failed');
    }
  }
},
    required(v) {
      return !!v || "Wajib Di isi";
    },
  },
};
</script>
<style scoped>
.bg-container {
  position: relative;
  padding: 0;
  overflow: hidden;
  min-height: 100vh;
}

.bg-container::before {
  content: "";
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  position: absolute;
  background-position: center;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.4;
}
</style>
