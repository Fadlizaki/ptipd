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
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn color="green" @click="exportDataToExcel"
                >Kirim Ke Excel</v-btn
              >
            </v-col>

            <v-col cols="auto">
              <v-btn
                color="primary"
                append-icon="mdi-printer"
                @click="printAllData"
                >Cetak Semua Data</v-btn
              >
            </v-col>
          </v-row>
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
          <tr v-for="(LMbarang, index) in getDatabarangmain" :key="LMbarang.id">
            <td>{{ index + 1 }}</td>
            <td>{{ LMbarang.id_komputer }}</td>
            <td>{{ LMbarang.nama_ruangan }}</td>
            <td>{{ LMbarang.kondisi }}</td>
            <td>{{ LMbarang.jenis_perbaikan }}</td>
            <td>{{ convertISOtoDate(LMbarang.tanggal_mulai) }}</td>
            <td>{{ convertISOtoDate(LMbarang.tanggal_berakhir) }}</td>
            <td>
              <v-icon @click="printData(LMbarang)">mdi-printer</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment/locale/id";
import * as XLSX from "xlsx";

export default {
  computed: {
    // GETTERS DATA Maintenace RUANGAN
    ...mapGetters("LMbarang", ["getDatabarangmain"]),
    // GETTERS DATA RUANGAN
    ...mapGetters("ruangan", ["getDataRuangan"]),
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
    ...mapActions("LMbarang", ["fetchDatabarangmain"]),
    exportDataToExcel() {
      const data = this.getDatabarangmain.map((LMbarang, index) => ({
        No: index + 1,
        ID: LMbarang.id_komputer,
        "Nama Ruangan": LMbarang.nama_ruangan,
        Kondisi: LMbarang.kondisi,
        "Jenis Perbaikan": LMbarang.jenis_perbaikan,
        "Tanggal Mulai": LMbarang.tanggal_mulai,
        "Tanggal Selesai": LMbarang.tanggal_berakhir,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      // Tambahkan header
      const header = [
        "No",
        "ID",
        "Nama Ruangan",
        "Kondisi",
        "Jenis Perbaikan",
        "Tanggal Mulai",
        "Tanggal Selesai",
      ];
      XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      const fileName = "data maintenace barang.xlsx";
      if (window.navigator.msSaveOrOpenBlob) {
        // For IE
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        // For other browsers
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    },
    printData(LMbarang) {
      console.log(LMbarang);
      // Membuat dokumen baru untuk mencetak data individu
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Barang</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr><th>ID</th><th>Nama Ruangan</th><th>Kondisi</th><th>Jenis Perbaikan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>"
      );
      printWindow.document.write("<tr>");
      printWindow.document.write("<td>" + LMbarang.id_komputer + "</td>");
      printWindow.document.write("<td>" + LMbarang.nama_ruangan + "</td>");
      printWindow.document.write("<td>" + LMbarang.kondisi + "</td>");
      printWindow.document.write("<td>" + LMbarang.jenis_perbaikan + "</td>");
      printWindow.document.write("<td>" + LMbarang.tanggal_mulai + "</td>");
      printWindow.document.write("<td>" + LMbarang.tanggal_berakhir + "</td>");
      printWindow.document.write("</tr>");
      printWindow.document.write("</table>");

      printWindow.document.write("</body></html>");
      printWindow.document.close();

      // Memanggil fungsi pencetakan bawaan browser
      printWindow.print();
      printWindow.close();
    },
    printAllData() {
      const dataToPrint = this.getDatabarangmain; // Mengambil semua data komputer dari Vuex store

      // Membuat dokumen baru untuk mencetak semua data
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Semua Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Barang</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr><th>No</th><th>ID</th><th>Nama Ruangan</th><th>Kondisi</th><th>Jenis Perbaikan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>"
      );
      dataToPrint.forEach((LMbarang, index) => {
        printWindow.document.write("<tr>");
        printWindow.document.write("<td>" + (index + 1) + "</td>");
        printWindow.document.write("<td>" + LMbarang.id_komputer + "</td>");
        printWindow.document.write("<td>" + LMbarang.nama_ruangan + "</td>");
        printWindow.document.write("<td>" + LMbarang.kondisi + "</td>");
        printWindow.document.write("<td>" + LMbarang.jenis_perbaikan + "</td>");
        printWindow.document.write("<td>" + LMbarang.tanggal_mulai + "</td>");
        printWindow.document.write(
          "<td>" + LMbarang.tanggal_berakhir + "</td>"
        );
        printWindow.document.write("</tr>");
      });

      printWindow.document.write("</table>");
      printWindow.document.write("</body></html>");
      printWindow.document.close();

      // Memanggil fungsi pencetakan bawaan browser
      printWindow.print();
      printWindow.close();
    },
  },
  data: () => {
    return {
      items: [
        {
          title: "Laporan",
          disabled: true,
          href: "",
        },
        {
          title: "Maintenace",
          disabled: true,
          href: "",
        },
        {
          title: "Data barang",
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
    this.$store.dispatch("LMbarang/fetchDatabarangmain");
  },
};
</script>
