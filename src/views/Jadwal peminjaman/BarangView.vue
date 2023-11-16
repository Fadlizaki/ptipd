<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card flat class="border mb-4">
      <div class="d-flex justify-space-between">
        <v-card-title>Data Barang</v-card-title>

        <v-card-title>
          <v-dialog v-model="dialogEdit" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="openDialogEdit(barang)"></v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit Data Barang</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.peminjam"
                        label="Nama"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="formData.instansi"
                        label="Intansi"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                      v-model="formData.id_komputer"
                      label="Barang"
                      :items="getDataKomputer"
                      :item-props="komputerProps"
                      :rules="[required]"
                      variant="outlined"
                    ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="formData.tgl_peminjaman"
                        label="Tanggal Peminjaman"
                        type="date"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="formData.tgl_kembali"
                        label="Tanggal Kembali"
                        type="date"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData.status_peminjaman"
                        label="Status"
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
                          v-model="formData.peminjam"
                          label="Nama"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="formData.instansi"
                          label="Intansi"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="formData.id_komputer"
                          label="Barang"
                          :items="getAvailablekomputer"
                          :item-props="komputerProps"
                          :rules="[required]"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.tgl_peminjaman"
                          label="Tanggal Peminjaman"
                          type="date"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="formData.tgl_kembali"
                          label="Tanggal Kembali"
                          type="date"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="formData.status_peminjaman"
                          label="Status"
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
            <th>Nama Peminjam</th>
            <th>Intansi/Unit</th>
            <th>Jenis Barang</th>
            <th>Ruangan</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(barang, index) in getDatabarang" :key="barang.id">
            <td>{{ index + 1 }}</td>
            <td>{{ barang.id }}</td>
            <td>{{ barang.peminjam }}</td>
            <td>{{ barang.instansi }}</td>
            <td>{{ barang.jenis }}</td>
            <td>{{ barang.nama_ruangan}}</td>
            <td>{{ convertISOtoDate(barang.tgl_peminjaman) }}</td>
            <td>{{ convertISOtoDate(barang.tgl_kembali) }}</td>
            <td>{{ barang.status_peminjaman }}</td>
            <td>
              <v-icon v-bind="props" @click="openDialogEdit(barang)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="hapusBarang(barang.id)">mdi-delete</v-icon>
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
    // GETTERS DATA PEMINJAMAN RUANGAN
    ...mapGetters("barang", ["getDatabarang", "getbarangTerpilih"]),
    // GETTERS DATA RUANGAN
    ...mapGetters("ppkomputer", ["getDataKomputer"]),
    getAvailablekomputer() {
      // Filter ruangan yang belum dipilih
      return this.getDataKomputer.filter(
        (ppkomputer) =>
          !this.getDatabarang.some(
            (selectedKomputer) => selectedKomputer.id_komputer === ppkomputer.id
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
    komputerProps(komputer) {
      return {
        title: komputer.id,
        value: komputer.id,
      };
    },
    required(v) {
      return !!v || "wajib diisi";
    },
    ...mapActions("barang", [
      "fetchDatabarang",
      "tambahDatabarang",
      "ubahDatabarang",
      "hapusDatabarang",
    ]),
    ...mapMutations("barang", ["pinjambarangTerpilih"]),

    async tambahBarang() {
      try {
        if (this.$refs.form.validate()) {
          this.formData.id_barang_pendukung =
            this.formData.id_barang_pendukung || null; // Atur nilai jika belum diatur
          await this.tambahDatabarang(this.formData).then(async () => {
            await this.fetchDatabarang(); // Ambil data terbaru
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
        const barangId = this.formData.id;
        let formEditbarang = { ...this.formData };
        let keysToDelete = ["created_at", "updated_at"];
        keysToDelete.forEach((key) => delete formEditbarang[key]);

        await this.ubahDatabarang({ barangId, formEditbarang }).then(
          async () => {
            await this.fetchDatabarang(); // Ambil data terbaru
            this.resetForm(); // Reset formulir
            this.dialogEdit = false;
          }
        );
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    hapusBarang(idbarang) {
      this.komputerToDelete = idbarang;
      this.dialogDeleteConfirmation = true;
    },
    hapusData() {
      try {
        const idbarang = this.komputerToDelete;
        // Panggil aksi hapusDataKomputer dengan idbarang yang ingin dihapus
        this.hapusDatabarang(idbarang).then(async () => {
          await this.fetchDatabarang(); // Ambil data terbaru
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
        peminjam: "",
        instansi: "",
        id_komputer: "",
        tgl_peminjaman: "",
        tgl_kembali: "",
        status_peminjaman: "",
      };
    },

    closeDialog() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogCreate = false;
    },
    openDialogEdit(barang) {
      this.formData = { ...barang };
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
          title: "Jadwal Peminjaman ",
          disabled: true,
          href: "",
        },
        {
          title: "Data Barang",
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
        peminjam: "",
        instansi: "",
        id_komputer: "",
        tgl_peminjaman: "",
        tgl_kembali: "",
        status_peminjaman: "",
      },
    };
  },
  created() {
    this.$store.dispatch("barang/fetchDatabarang");
    this.$store.dispatch("ppkomputer/fetchDataKomputer");
  },
};
</script>
