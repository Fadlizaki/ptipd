<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card flat class="border mb-4">
      <div class="d-flex justify-space-between">
        <v-card-title>Data Jadwal Maintenace</v-card-title>

        <v-card-title>
          <v-dialog v-model="dialogEdit" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="openDialogEdit(mruangan)"></v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit Data Ruangan</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.nama"
                        label="Nama"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="formData.id_ruangan"
                        label="Ruangan"
                        :items="getDataRuangan"
                        :item-props="ruanganProps"
                        :rules="[required]"
                        variant="outlined"
                      ></v-select>
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
                        <v-text-field
                          v-model="formData.nama"
                          label="Nama"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="formData.id_ruangan"
                          label="Ruangan"
                          :items="getAvailableRuangan"
                          :item-props="ruanganProps"
                          :rules="[required]"
                          variant="outlined"
                        ></v-select>
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
            <th>Nama PIC</th>
            <th>Ruangan</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(mruangan, index) in getDataruanganmain"
            :key="mruangan.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ mruangan.id }}</td>
            <td>{{ mruangan.nama }}</td>
            <td>{{ mruangan.nama_ruangan }}</td>
            <td>{{ convertISOtoDate(mruangan.tanggal_mulai) }}</td>
            <td>{{ convertISOtoDate(mruangan.tanggal_berakhir) }}</td>
            <td>
              <v-icon v-bind="props" @click="openDialogEdit(mruangan)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="hapusBarang(mruangan.id)">mdi-delete</v-icon>
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
    ...mapGetters("mruangan", ["getDataruanganmain", "getruanganmainTerpilih"]),
    // GETTERS DATA RUANGAN
    ...mapGetters("ruangan", ["getDataRuangan"]),
    getAvailableRuangan() {
    // Filter ruangan yang belum dipilih
    return this.getDataRuangan.filter(
      (ruangan) =>
        !this.getDataruanganmain.some((selectedRuangan) => selectedRuangan.id_ruangan === ruangan.id)
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
    ruanganProps(ruangan) {
      return {
        title: ruangan.nama_ruangan,
        value: ruangan.id,
      };
    },
    required(v) {
      return !!v || "wajib diisi";
    },
    ...mapActions("mruangan", [
      "fetchDataruanganmain",
      "tambahDataruanganmain",
      "ubahDataruanganmain",
      "hapusDataruanganmain",
    ]),
    ...mapMutations("mruangan", ["ruanganmainTerpilih"]),

    async tambahBarang() {
      try {
        if (this.$refs.form.validate()) {
          await this.tambahDataruanganmain(this.formData).then(async () => {
            await this.fetchDataruanganmain(); // Ambil data terbaru
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
        const ruanganmainId = this.formData.id;
        let formEditruanganmain = { ...this.formData };
        let keysToDelete = ["created_at", "updated_at"];
        keysToDelete.forEach((key) => delete formEditruanganmain[key]);

        const formattedStartDate = moment(
          formEditruanganmain.tanggal_mulai
        ).format("YYYY-MM-DD");
        const formattedEndDate = moment(
          formEditruanganmain.tanggal_berakhir
        ).format("YYYY-MM-DD");

        console.log("Tanggal Mulai:", formattedStartDate);
        console.log("Tanggal Berakhir:", formattedEndDate);

        await this.ubahDataruanganmain({
          ruanganmainId,
          formEditruanganmain,
        }).then(async () => {
          await this.fetchDataruanganmain(); // Ambil data terbaru
          this.resetForm(); // Reset formulir
          this.dialogEdit = false;
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    hapusBarang(idruanganmain) {
      this.komputerToDelete = idruanganmain;
      this.dialogDeleteConfirmation = true;
    },
    hapusData() {
      try {
        const idruanganmain = this.komputerToDelete;
        // Panggil aksi hapusDataKomputer dengan idruanganmain yang ingin dihapus
        this.hapusDataruanganmain(idruanganmain).then(async () => {
          await this.fetchDataruanganmain(); // Ambil data terbaru
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
        nama: "",
        id_ruangan: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
      };
    },

    closeDialog() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogCreate = false;
    },
    openDialogEdit(mruangan) {
      this.formData = { ...mruangan };
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
          title: "Data Maintenace Ruangan",
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
        nama: "",
        id_ruangan: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
      },
    };
  },
  created() {
    this.$store.dispatch("mruangan/fetchDataruanganmain");
    this.$store.dispatch("ruangan/fetchDataRuangan");
  },
};
</script>
