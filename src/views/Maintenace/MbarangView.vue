<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card flat class="border mb-4">
      <div class="d-flex justify-space-between">
        <v-card-title>Data Barang Maintenace</v-card-title>

        <v-card-title>
          <v-dialog v-model="dialogEdit" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="openDialogEdit(mbarang)"></v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit Data Barang</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="formData.id_komputer"
                        label="ID komputer"
                        :items="getDataKomputer"
                        :item-props="ruanganProps"
                        :rules="[required]"
                        variant="outlined"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.jenis_perbaikan"
                        label="Jenis Perbaikan"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.tanggal_mulai"
                        label="Tanggal Masuk"
                        type="date"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.tanggal_berakhir"
                        label="Tanggal Berakhir"
                        type="date"
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
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="formData.id_komputer"
                          label="ID komputer"
                          :items="getAvailablekomputer"
                          :item-props="ruanganProps"
                          :rules="[required]"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="formData.jenis_perbaikan"
                          label="Jenis Perbaikan"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="formData.tanggal_mulai"
                          label="Tanggal Masuk"
                          type="date"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="formData.tanggal_berakhir"
                          label="Tanggal Berakhir"
                          type="date"
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
            <th>ID</th>
            <th>Nama Ruangan</th>
            <th>Kondisi</th>
            <th>Jenis Perbaikan</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mbarang, index) in getDatabarangmain" :key="mbarang.id">
            <td>{{ index + 1 }}</td>
            <td>{{ mbarang.id_komputer }}</td>
            <td>{{ mbarang.nama_ruangan }}</td>
            <td>{{ mbarang.kondisi }}</td>
            <td>{{ mbarang.jenis_perbaikan }}</td>
            <td>{{ convertISOtoDate(mbarang.tanggal_mulai) }}</td>
            <td>{{ convertISOtoDate(mbarang.tanggal_berakhir) }}</td>
            <td>
              <v-icon v-bind="props" @click="openDialogEdit(mbarang)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="hapusBarang(mbarang.id)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
import "moment/locale/id";

export default {
  computed: {
    // GETTERS DATA Maintenace RUANGAN
    ...mapGetters("mbarang", ["getDatabarangmain", "getbarangmainTerpilih"]),
    // GETTERS DATA RUANGAN
    ...mapGetters("komputer", ["getDataKomputer"]),
    getAvailablekomputer() {
      // Filter ruangan yang belum dipilih
      return this.getDataKomputer.filter(
        (komputer) =>
          !this.getDatabarangmain.some(
            (selectedKomputer) => selectedKomputer.id_komputer === komputer.id
          )
      );
    },
  },
  methods: {
    convertISOtoDate(isoString) {
      let tanggalAwal = new Date(isoString);
      tanggalAwal.setDate(tanggalAwal.getDate() + 1);

      const parsedDate = moment.utc(tanggalAwal);

      if (parsedDate.isValid()) {
        return parsedDate.locale("id").format("DD-MM-YYYY");
      } else {
        return "Invalid Date";
      }
    },
    ruanganProps(komputer) {
      return {
        title: komputer.id,
        value: komputer.id,
      };
    },
    required(v) {
      return !!v || "wajib diisi";
    },
    ...mapActions("mbarang", [
      "fetchDatabarangmain",
      "tambahDatabarangmain",
      "ubahDatabarangmain",
      "hapusDatabarangmain",
    ]),
    ...mapMutations("mbarang", ["barangmainTerpilih"]),

    async tambahBarang() {
      try {
        if (this.$refs.form.validate()) {
          await this.tambahDatabarangmain(this.formData).then(async () => {
            await this.fetchDatabarangmain(); // Ambil data terbaru
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
        const barangmainId = this.formData.id;
        let formEditbarangmain = { ...this.formData };
        let keysToDelete = ["created_at", "updated_at"];
        keysToDelete.forEach((key) => delete formEditbarangmain[key]);

        await this.ubahDatabarangmain({
          barangmainId,
          formEditbarangmain,
        }).then(async () => {
          await this.fetchDatabarangmain(); // Ambil data terbaru
          this.resetForm(); // Reset formulir
          this.dialogEdit = false;
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    hapusBarang(idbarangmain) {
      this.komputerToDelete = idbarangmain;
      this.dialogDeleteConfirmation = true;
    },
    hapusData() {
      try {
        const idbarangmain = this.komputerToDelete;
        // Panggil aksi hapusDataKomputer dengan idbarangmain yang ingin dihapus
        this.hapusDatabarangmain(idbarangmain).then(async () => {
          await this.fetchDatabarangmain(); // Ambil data terbaru
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
        id_komputer: "",
        jenis_perbaikan: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
      };
    },

    closeDialog() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogCreate = false;
    },
    openDialogEdit(mbarang) {
      this.formData = { ...mbarang };
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
          title: "Maintenace",
          disabled: true,
          href: "",
        },
        {
          title: "Data Maintenace Barang",
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
        id_komputer: "",
        jenis_perbaikan: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
      },
    };
  },
  created() {
    this.$store.dispatch("mbarang/fetchDatabarangmain");
  },
};
</script>
