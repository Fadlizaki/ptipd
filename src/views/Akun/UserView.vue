<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card flat class="border mb-4">
      <div class="d-flex justify-space-between">
        <v-card-title>Data User</v-card-title>

        <v-card-title>
          <v-dialog v-model="dialogEdit" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="openDialogEdit(user)"></v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Reset Password</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.password"
                        label="Password Baru"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.retype_password"
                        label="Konfirmasi Password"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDialogEdit"
                >
                  Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="editData">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeleteConfirmation" max-width="500">
            <v-card>
              <v-card-title class="headline"
                >Konfirmasi Hapus Data</v-card-title
              >
              <v-card-text>
                Apakah Anda yakin ingin menghapus data ini?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogDeleteConfirmation = false"
                  >Batal</v-btn
                >
                <v-btn color="red darken-1" text @click="hapusData"
                  >Hapus</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
      </div>
      <v-table>
        <thead>
          <tr>
            <th>No</th>
            <th>ID User</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Intansi</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in getDatauser" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.instansi }}</td>
            <td>{{ user.role }}</td>
            <td>
              <v-icon v-bind="props" @click="openDialogEdit(user)"
                >mdi-square-edit-outline</v-icon
              >
              <v-icon @click="hapusBarang(user.id)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["getDatauser", "getuserterpilih"]),
  },
  methods: {
    required(v) {
      return !!v || "wajib diisi";
    },
    ...mapActions("user", ["fetchDatauser", "ubahDatauser", "hapusDatauser"]),
    ...mapMutations("user", ["userTerpilih"]),

    async editData() {
      try {
        const userId = this.formData.id;
        let formEdituser = { ...this.formData };
        let keysToDelete = ["email", "id","instansi","name","role"];
        keysToDelete.forEach((key) => delete formEdituser[key]);

        await this.ubahDatauser({ userId, formEdituser }).then(async () => {
          this.resetForm(); // Reset formulir
          this.dialogEdit = false;
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    hapusBarang(iduser) {
      this.komputerToDelete = iduser;
      this.dialogDeleteConfirmation = true;
    },
    hapusData() {
      try {
        const iduser = this.komputerToDelete;
        // Panggil aksi hapusDataKomputer dengan iduser yang ingin dihapus
        this.hapusDatauser(iduser).then(async () => {
          await this.fetchDatauser(); // Ambil data terbaru
          this.komputerToDelete = null; // Reset nilai komputerToDelete
          this.dialogDeleteConfirmation = false; // Tutup dialog konfirmasi
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    resetForm() {
      this.formData = {
        password: "",
        retype_password: "",
      };
    },

    closeDialog() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogCreate = false;
    },
    openDialogEdit(user) {
      this.formData = { ...user };
      console.log(this.formData);
      // Buka dialog edit
      this.dialogEdit = true;
    },
    closeDialogEdit() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogEdit = false;
    },
  },
  data: () => {
    return {
      items: [
        {
          title: "Akun",
          disabled: true,
          href: "",
        },
        {
          title: "Data User",
          disabled: false,
          href: "",
        },
      ],
      dialog: false,
      dialogCreate: false,
      dialogEdit: false,
      dialogDeleteConfirmation: false,
      komputerToDelete: null,

      formData: {
        password: "",
        retype_password: "",
      },
    };
  },
  created() {
    this.$store.dispatch("user/fetchDatauser");
  },
};
</script>
