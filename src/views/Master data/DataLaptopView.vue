<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-card flat class="border mb-4">
      <div class="d-flex justify-space-between">
        <v-card-title>Data Laptop</v-card-title>

        <v-card-title>
          <v-dialog v-model="dialogEdit" persistent width="1024">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" @click="openDialogEdit(komputer)"></v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Edit Data</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
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
                        v-model="formData.urutan_meja"
                        label="Urutan Meja"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-select
                        v-model="formData.id_merk"
                        label="Merk"
                        :items="getDataMerk"
                        :item-props="merkProps"
                        :rules="[required]"
                        variant="outlined"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-select
                        v-model="formData.id_tipe"
                        label="Kategory"
                        :items="getDataTipe"
                        :item-props="tipeProps"
                        :rules="[required]"
                        variant="outlined"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="formData.spek"
                        label="Spek"
                        :rules="[required]"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="formData.kondisi"
                        label="Kondisi"
                        :rules="[required]"
                        :items="['Bagus', 'Sedang', 'Rusak']"
                        variant="outlined"
                      ></v-select>
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
                          v-model="formData.urutan_meja"
                          label="Urutan Meja"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-select
                          v-model="formData.id_merk"
                          label="Merk"
                          :items="getDataMerk"
                          :item-props="merkProps"
                          :rules="[required]"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                        <v-select
                          v-model="formData.id_tipe"
                          label="Kategory"
                          :items="getDataTipe"
                          :item-props="tipeProps"
                          :rules="[required]"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="formData.spek"
                          label="Processor"
                          :rules="[required]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="formData.kondisi"
                          label="Kondisi"
                          :rules="[required]"
                          :items="['Bagus', 'Sedang', 'Rusak']"
                          variant="outlined"
                        ></v-select>
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
            <th>ID Laptop</th>
            <th>Merk</th>
            <th>Spek laptop</th>
            <th>Ruangan</th>
            <th>Urutan Meja</th>
            <th>Kondisi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(laptop, index) in getDataLaptop" :key="laptop.id">
            <td>{{ index + 1 }}</td>
            <td>{{ laptop.id }}</td>
            <td>{{ laptop.nama_merk }}</td>
            <td>{{ laptop.spek }}</td>
            <td>{{ laptop.nama_ruangan }}</td>
            <td>{{ laptop.urutan_meja }}</td>
            <td>
              <v-chip :color="getKondisiChipColor(laptop.kondisi)" dark>
                {{ laptop.kondisi }}
              </v-chip>
            </td>
            <td>
              <v-icon v-bind="props" @click="openDialogEdit(laptop)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="hapusBarang(laptop.id)">mdi-delete</v-icon>
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
    ...mapGetters("laptop", ["getDataLaptop", "getLaptopTerpilih"]),
    ...mapGetters("ruangan", ["getDataRuangan"]),
    ...mapGetters("merk", ["getDataMerk"]),
    ...mapGetters("tipe", ["getDataTipe"]),
    getDataTipe() {
      return this.$store.getters["tipe/getDataTipe"].filter(
        (tipe) => tipe.tipe_barang === "Laptop"
      );
    },
  },
  methods: {
    merkProps(merk) {
      return {
        title: merk.nama_merk,
        value: merk.id,
      };
    },
    tipeProps(tipe) {
      return {
        title: tipe.tipe_barang,
        value: tipe.id,
      };
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
    ...mapActions("laptop", [
      "fetchDataLaptop",
      "tambahDataLaptop",
      "ubahDataLaptop",
      "hapusDataLaptop",
    ]),
    ...mapActions("ruangan", ["fetchDataRuangan"]),
    ...mapActions("merk", ["fetchDataMerk"]),
    ...mapActions("tipe", ["fetchDataTipe"]),
    ...mapMutations("laptop", ["laptopTerpilih"]),

    getKondisiChipColor(kondisi) {
      if (kondisi === "Rusak") {
        return "red";
      } else if (kondisi === "Sedang") {
        return "brown";
      } else if (kondisi === "Bagus") {
        return "green";
      } else {
        return "grey";
      }
    },

    async tambahBarang() {
      try {
        if (this.$refs.form.validate()) {
          await this.tambahDataLaptop(this.formData).then(async () => {
            await this.fetchDataLaptop(); // Ambil data terbaru
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
        const laptopId = this.formData.id;
        let formEditLaptop = { ...this.formData };
        let keysToDelete = ["nama_merk", "nama_ruangan", "tipe_barang", "id"];
        keysToDelete.forEach((key) => delete formEditLaptop[key]);

        await this.ubahDataLaptop({ laptopId, formEditLaptop }).then(
          async () => {
            await this.fetchDataLaptop(); // Ambil data terbaru
            this.resetForm(); // Reset formulir
            this.dialogEdit = false;
          }
        );
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    hapusBarang(idLaptop) {
      this.laptopToDelete = idLaptop;
      this.dialogDeleteConfirmation = true;
    },
    hapusData() {
      try {
        const idLaptop = this.laptopToDelete;

        // Panggil aksi hapusDataKomputer dengan idKomputer yang ingin dihapus
        this.hapusDataLaptop(idLaptop).then(async () => {
          await this.fetchDataLaptop(); // Ambil data terbaru
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
        id_merk: "",
        id_tipe: "",
        spek: "",
        kondisi: "",
        id_ruangan: "",
        urutan_meja: "",
      };
    },

    closeDialog() {
      this.resetForm(); // Memanggil metode resetForm saat dialog ditutup
      this.dialogCreate = false;
    },
    openDialogEdit(laptop) {
      this.formData = { ...laptop };
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
          title: "Data Laptop",
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
        id_merk: "",
        id_tipe: "",
        spek: "",
        kondisi: "",
        id_ruangan: "",
        urutan_meja: "",
      },
    };
  },
  created() {
    this.$store.dispatch("laptop/fetchDataLaptop");
    this.$store.dispatch("ruangan/fetchDataRuangan");
    this.$store.dispatch("merk/fetchDataMerk");
    this.$store.dispatch("tipe/fetchDataTipe");
  },
};
</script>
