<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card flat class="border mb-4">
      <div class="d-flex justify-space-between">
        <v-card-title>Data Ruangan</v-card-title>

        <v-card-title>
          <v-dialog v-model="dialogEdit" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="openDialogEdit(ruangan)"></v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit Data Barang</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="formData.nama_ruangan"
                        label="Nama Ruangan"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="formData.penanggung_jawab"
                        label="Penangung Jawab"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="formData.jumlah_komputer_laptop"
                        label="Jumlah PC/Laptop"
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
          <v-dialog v-model="dialogCreate" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props"> Tambah </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Tambah Data</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.nama_ruangan"
                          label="Nama Ruangan"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.penanggung_jawab"
                          label="Penangung Jawab"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.jumlah_komputer_laptop"
                          label="Jumlah PC/Laptop"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDialog"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="tambahBarang"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
      </div>
      <v-table>
        <thead>
          <tr>
            <th>No</th>
            <th>ID Ruangan</th>
            <th>Nama Ruangan</th>
            <th>Penanggung Jawab</th>
            <th>Jumlah PC/Laptop</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ruangan, index) in getDataRuangan" :key="ruangan.id">
            <td>{{ index + 1 }}</td>
            <td>{{ ruangan.id }}</td>
            <td>{{ ruangan.nama_ruangan }}</td>
            <td>{{ ruangan.penanggung_jawab }}</td>
            <td>{{ ruangan.jumlah_komputer_laptop }}</td>
            <td>
              <v-icon>mdi-eye</v-icon>
              <v-icon v-bind="props" @click="openDialogEdit(ruangan)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="hapusBarang(ruangan.id)">mdi-delete</v-icon>
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
    ...mapGetters("ruangan", ["getDataRuangan", "getruanganterpilih"]),
  },
  methods: {
    required(v) {
      return !!v || "wajib diisi";
    },
    ...mapActions("ruangan", [
      "fetchDataRuangan",
      "tambahDataRuangan",
      "ubahDataruangan",
      "hapusDataruangan",
    ]),
    ...mapMutations("ruangan", ["ruanganTerpilih"]),

    async tambahBarang() {
      try {
        if (this.$refs.form.validate()) {
          await this.tambahDataRuangan(this.formData).then(async () => {
            await this.fetchDataRuangan(); // Ambil data terbaru
            this.resetForm(); // Reset formulir
            this.dialogCreate = false;
          });
        } else {
          alert("Silakan isi semua bidang sebelum menyimpan.");
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async editData() {
      try {
        const ruanganId = this.formData.id;
        let formEditruangan = { ...this.formData };
        let keysToDelete = ["created_at", "updated_at"];
        keysToDelete.forEach((key) => delete formEditruangan[key]);

        await this.ubahDataruangan({ ruanganId, formEditruangan }).then(
          async () => {
            await this.fetchDataRuangan(); // Ambil data terbaru
            this.resetForm(); // Reset formulir
            this.dialogEdit = false;
          }
        );
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    hapusBarang(idruangan) {
      this.komputerToDelete = idruangan;
      this.dialogDeleteConfirmation = true;
    },
    hapusData() {
      try {
        const idruangan = this.komputerToDelete;
        // Panggil aksi hapusDataKomputer dengan idruangan yang ingin dihapus
        this.hapusDataruangan(idruangan).then(async () => {
          await this.fetchDataRuangan(); // Ambil data terbaru
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
        id: "",
        nama_ruangan: "",
        penanggung_jawab: "",
        jumlah_komputer_laptop: "",
      };
    },

    closeDialog() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogCreate = false;
    },
    openDialogEdit(ruangan) {
      this.formData = { ...ruangan };
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
          title: "Master Data",
          disabled: true,
          href: "",
        },
        {
          title: "Data Ruangan",
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
        id: "",
        nama_ruangan: "",
        penanggung_jawab: "",
        jumlah_komputer_laptop: "",
      },
    };
  },
  created() {
    this.$store.dispatch("ruangan/fetchDataRuangan");
    // this.$store.dispatch("ruangan/fetchDataRuangan");
    // this.$store.dispatch("merk/fetchDataMerk");
    // this.$store.dispatch("tipe/fetchDataTipe");
  },
};
</script>
