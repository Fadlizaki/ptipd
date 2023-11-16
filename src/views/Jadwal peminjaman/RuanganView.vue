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
                <v-icon v-bind="props" @click="openDialogEdit(ruangans)"></v-icon>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Data Ruangan</span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="formData.nama_peminjam"
                            label="Nama"
                            :rules="[required]"
                            variant="outlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="formData.instansi"
                            label="Intansi"
                            :rules="[required]"
                            variant="outlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                            v-model="formData.kegiatan"
                            label="Kegiatan"
                            :rules="[required]"
                            variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field
                            v-model="formData.jenis_kegiatan"
                            label="Jenis Kegiatan"
                            :rules="[required]"
                            variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            v-model="formData.id_ruangan"
                            label="Ruangan"
                            :items="getDataRuangan"
                            :item-props="ruanganProps"
                            :rules="[required]"
                            variant="outlined"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="formData.tanggal_peminjaman"
                            label="Tanggal Peminjaman"
                            type="date"
                            :rules="[required]"
                            variant="outlined"
                          ></v-text-field>
                          
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="formData.tanggal_kembali"
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
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="formData.nama_peminjam"
                                label="Nama"
                                :rules="[required]"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="formData.instansi"
                                label="Intansi"
                                :rules="[required]"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                v-model="formData.kegiatan"
                                label="Kegiatan"
                                :rules="[required]"
                                variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.jenis_kegiatan"
                                label="Jenis Kegiatan"
                                :rules="[required]"
                                variant="outlined"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-select
                              v-model="formData.id_ruangan"
                              label="Ruangan"
                              :items="getAvailableRuangan"
                              :item-props="ruanganProps"
                              :rules="[required]"
                              variant="outlined"
                            ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.tanggal_peminjaman"
                                label="Tanggal Peminjaman"
                                type="date"
                                :rules="[required]"
                                variant="outlined"
                              ></v-text-field>
                              
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="formData.tanggal_kembali"
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
              <th>Nama</th>
              <th>Intansi/Unit</th>
              <th>Kegiatan</th>
              <th>Jenis Kegiatan</th>
              <th>Ruangan</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ruangans, index) in getDataruangan" :key="ruangans.id">
              <td>{{ index + 1 }}</td>
              <td>{{ ruangans.id }}</td>
              <td>{{ ruangans.nama_peminjam }}</td>
              <td>{{ ruangans.instansi }}</td>
              <td>{{ ruangans.kegiatan }}</td>
              <td>{{ ruangans.jenis_kegiatan }}</td>
              <td>{{ ruangans.nama_ruangan }}</td>
              <td>{{ convertISOtoDate(ruangans.tanggal_peminjaman) }}</td>
              <td>{{ convertISOtoDate(ruangans.tanggal_kembali) }}</td>
              <td>{{ ruangans.status_peminjaman }}</td>
              <td>
                <v-icon v-bind="props" @click="openDialogEdit(ruangans)"
                  >mdi-pencil</v-icon
                >
                <v-icon @click="hapusBarang(ruangans.id)">mdi-delete</v-icon>
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
      ...mapGetters("ruangans", ["getDataruangan", "getruanganTerpilih"]),
      // GETTERS DATA RUANGAN
      ...mapGetters("ruangan", ["getDataRuangan"]),
      getAvailableRuangan() {
    // Filter ruangan yang belum dipilih
    return this.getDataRuangan.filter(
      (ruangan) =>
        !this.getDataruangan.some((selectedRuangan) => selectedRuangan.id_ruangan === ruangan.id)
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
      ...mapActions("ruangans", [
        "fetchDataruangan",
        "tambahDataruangan",
        "ubahDataruangan",
        "hapusDataruangan",
      ]),
      ...mapMutations("ruangan", ["ruanganTerpilih"]),
  
      async tambahBarang() {
        try {
          if (this.$refs.form.validate()) {
            await this.tambahDataruangan(this.formData).then(async () => {
              await this.fetchDataruangan(); // Ambil data terbaru
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
              await this.fetchDataruangan(); // Ambil data terbaru
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
            await this.fetchDataruangan(); // Ambil data terbaru
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
            nama_peminjam: "",
            id_ruangan: "",
            kegiatan: "",
            jenis_kegiatan: "",
            instansi: "",
            tanggal_peminjaman: "",
            tanggal_kembali: "",
            status_peminjaman: "",
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
            title: "Jadwal Peminjaman",
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
            nama_peminjam: "",
            id_ruangan: "",
            kegiatan: "",
            jenis_kegiatan: "",
            instansi: "",
            tanggal_peminjaman: "",
            tanggal_kembali: "",
            status_peminjaman: "",
        },
      };
    },
    created() {
      this.$store.dispatch("ruangans/fetchDataruangan");
      this.$store.dispatch("ruangan/fetchDataRuangan");
    },
  };
  </script>
  