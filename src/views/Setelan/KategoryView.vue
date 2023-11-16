<template>
    <v-container>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
  
      <v-card flat class="border mb-4">
        <div class="d-flex justify-space-between">
          <v-card-title>Data Tipe</v-card-title>
  
          <v-card-title>
            <v-dialog v-model="dialogEdit" persistent width="1024">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" @click="openDialogEdit(tipe)"></v-icon>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Data tipe</span>
                </v-card-title>
  
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="formData.tipe_barang"
                          label="Nama tipe"
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
                        <v-col cols="12" sm="6" md="12">
                          <v-text-field
                            v-model="formData.tipe_barang"
                            label="Nama tipe"
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
              <th>Nama Kategory</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tipe, index) in getDataTipe" :key="tipe.id">
              <td>{{ index + 1 }}</td>
              <td>{{ tipe.id }}</td>
              <td>{{ tipe.tipe_barang }}</td>
              <td>
                <v-icon v-bind="props" @click="openDialogEdit(tipe)"
                  >mdi-pencil</v-icon
                >
                <v-icon @click="hapusBarang(tipe.id)">mdi-delete</v-icon>
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
      ...mapGetters("tipe", ["getDataTipe", "gettipeterpilih"]),
    },
    methods: {
      required(v) {
        return !!v || "wajib diisi";
      },
      ...mapActions("tipe", [
        "fetchDataTipe",
        "tambahDatatipe",
        "ubahDatatipe",
        "hapusDatatipe",
      ]),
      ...mapMutations("tipe", ["tipeTerpilih"]),
  
      async tambahBarang() {
        try {
          if (this.$refs.form.validate()) {
            await this.tambahDatatipe(this.formData).then(async () => {
              await this.fetchDataTipe(); // Ambil data terbaru
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
          const tipeId = this.formData.id;
          let formEdittipe = { ...this.formData };
          let keysToDelete = ["created_at", "updated_at"];
          keysToDelete.forEach((key) => delete formEdittipe[key]);
  
          await this.ubahDatatipe({ tipeId, formEdittipe }).then(
            async () => {
              await this.fetchDataTipe(); // Ambil data terbaru
              this.resetForm(); // Reset formulir
              this.dialogEdit = false;
            }
          );
        } catch (error) {
          alert(error);
          console.log(error);
        }
      },
      hapusBarang(idtipe) {
        this.komputerToDelete = idtipe;
        this.dialogDeleteConfirmation = true;
      },
      hapusData() {
        try {
          const idtipe = this.komputerToDelete;
          // Panggil aksi hapusDataKomputer dengan idtipe yang ingin dihapus
          this.hapusDatatipe(idtipe).then(async () => {
            await this.fetchDataTipe(); // Ambil data terbaru
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
          tipe_barang: "",
        };
      },
  
      closeDialog() {
        this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
        this.dialogCreate = false;
      },
      openDialogEdit(tipe) {
        this.formData = { ...tipe };
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
            title: "Setting",
            disabled: true,
            href: "",
          },
          {
            title: "Data Tipe",
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
          tipe_barang: "",
        },
      };
    },
    created() {
      this.$store.dispatch("tipe/fetchDataTipe");
      // this.$store.dispatch("ruangan/fetchDataRuangan");
      // this.$store.dispatch("merk/fetchDataMerk");
      // this.$store.dispatch("tipe/fetchDataTipe");
    },
  };
  </script>
  