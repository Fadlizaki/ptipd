<template>
  <v-container fluid class="bg-container">
    <v-card
      class="mx-auto px-5 py-10 rounded-xl my-16"
      min-width="300"
      max-width="500"
    >
      <v-form @submit.prevent="performRegister">
        <v-img
          class="mx-auto"
          max-width="300"
          src="../assets/PTIPD.png"
        ></v-img>

        <v-card-title
          class="text-center text- mt-3 font-palaquin-dark"
          style="color: #3784b4"
        >
          Buat Akun
        </v-card-title>

        <v-card-text class="flex flex-col space-y-4 mb-6">
          <div>
            <div class="text-subtitle-1 font-palaquin-dark">Name</div>

            <v-text-field
              v-model="name"
              class="rounded-lg"
              density="compact"
              variant="tonal"
              placeholder="username"
              bg-color="blue-lighten-5"
              :rules="[required]"
            ></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 font-palaquin-dark">Intansi</div>

            <v-text-field
              v-model="instansi"
              class="rounded-lg"
              density="compact"
              variant="tonal"
              placeholder="Intansi"
              bg-color="blue-lighten-5"
              :rules="[required]"
            ></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 font-palaquin-dark">Email</div>

            <v-text-field
              v-model="email"
              class="rounded-lg"
              density="compact"
              variant="tonal"
              placeholder="login@gmail.com"
              :rules="[required]"
              bg-color="blue-lighten-5"
            ></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 d-flex font-palaquin-dark">
              Password
            </div>

            <v-text-field
              v-model="password"
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
          </div>

          <center>
            <v-btn
              rounded="xl"
              width="150"
              class="mt-5"
              style="background-color: #a4e75d"
              size="large"
              type="submit"
              variant="elevated"
              @click="performRegister"
            >
              <span style="color: #ffff"
                >REGISTER
                <v-icon dark right> mdi-arrow-right </v-icon>
              </span>
            </v-btn>
          </center>

          <v-card-subtitle class="text-center mt-5"
            ><a href="/login">Sudah Punya Akun? Login</a></v-card-subtitle
          >
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    show1: false,
    name: "",
    email: "",
    instansi: "",
    password: "",
    rules: {
      required: (value) => !!value || "Wajib Di isi",
    },
  }),

  methods: {
    ...mapActions("auth", ["register"]),
    async performRegister() {
      const credentials = {
        name: this.name,
        email: this.email,
        instansi: this.instansi,
        password: this.password,
      };

      const success = await this.register(credentials);

      if (success) {
        // Redirect to the desired route on successful login
        this.$router.push("/login");
      } else {
        alert("Register Failed");
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
