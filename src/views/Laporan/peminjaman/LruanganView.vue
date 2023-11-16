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
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn
                color="success"
                append-icon="mdi-file-excel"
                @click="exportDataToExcel"
                >Kirim Ke Excel</v-btn
              >
            </v-col>

            <v-col cols="auto">
              <v-btn
                color="primary"
                append-icon="mdi-printer"
                @click="printTableData"
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
          <tr v-for="(Lkomputer, index) in getDataruangan" :key="Lkomputer.id">
            <td>{{ index + 1 }}</td>
            <td>{{ Lkomputer.id }}</td>
            <td>{{ Lkomputer.nama_peminjam }}</td>
            <td>{{ Lkomputer.instansi }}</td>
            <td>{{ Lkomputer.kegiatan }}</td>
            <td>{{ Lkomputer.jenis_kegiatan }}</td>
            <td>{{ Lkomputer.nama_ruangan }}</td>
            <td>{{ convertISOtoDate(Lkomputer.tanggal_peminjaman) }}</td>
            <td>{{ convertISOtoDate(Lkomputer.tanggal_kembali) }}</td>
            <td>{{ Lkomputer.status_peminjaman }}</td>
            <td>
              <v-icon @click="printData(Lkomputer.id)">mdi-printer</v-icon>

            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import * as XLSX from "xlsx";
import moment from "moment";
import "moment/locale/id"; // Impor bahasa Indonesia

import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("Lruangan", ["getDataruangan"]),
  },
  methods: {
    ...mapActions("Lruangan", ["fetchDataruangan"]),
    convertISOtoDate(isoString) {
      return moment.utc(isoString).locale("id").format("ddd MMM DD YYYY");
    },
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

    exportDataToExcel() {
      const data = this.getDataruangan.map((Lruangan, index) => ({
        No: index + 1,
        "ID Ruangan": Lruangan.id,
        Nama: Lruangan.nama_peminjam,
        "Intansi Unit": Lruangan.instansi,
        Kegiatan: Lruangan.kegiatan,
        "Jenis Kegiatan": Lruangan.jenis_kegiatan,
        Ruangan: Lruangan.nama_ruangan,
        "Tanggal Mulai": Lruangan.tanggal_peminjaman,
        "Tanggal Selesai": Lruangan.tanggal_kembali,
        Status: Lruangan.status_peminjaman,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      // Tambahkan header
      const header = [
        "No",
        "ID Ruangan",
        "Nama",
        "Intansi Unit",
        "Kegiatan",
        "Jenis Kegiatan",
        "Ruangan",
        "Tanggal Mulai",
        "Tanggal Selesai",
        "status",
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
      const fileName = "data_ruangan.xlsx";
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
    printTableData() {
      const dataToPrint = this.getDataruangan;

      // Membuat dokumen baru untuk mencetak data
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Ruangan</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr><th>No</th><th>ID</th><th>Nama</th><th>Instansi/Unit</th><th>Kegiatan</th><th>Jenis Kegiatan</th><th>Ruangan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th><th>Status</th></tr>"
      );

      dataToPrint.forEach((Lkomputer, index) => {
        printWindow.document.write("<tr>");
        printWindow.document.write("<td>" + (index + 1) + "</td>");
        printWindow.document.write("<td>" + Lkomputer.id + "</td>");
        printWindow.document.write("<td>" + Lkomputer.nama_peminjam + "</td>");
        printWindow.document.write("<td>" + Lkomputer.instansi + "</td>");
        printWindow.document.write("<td>" + Lkomputer.kegiatan + "</td>");
        printWindow.document.write("<td>" + Lkomputer.jenis_kegiatan + "</td>");
        printWindow.document.write("<td>" + Lkomputer.nama_ruangan + "</td>");
        printWindow.document.write(
          "<td>" + this.convertISOtoDate(Lkomputer.tanggal_peminjaman) + "</td>"
        );
        printWindow.document.write(
          "<td>" + this.convertISOtoDate(Lkomputer.tanggal_kembali) + "</td>"
        );

        printWindow.document.write(
          "<td>" + Lkomputer.status_peminjaman + "</td>"
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
    printData(selectedId) {
      const dataToPrint = this.getDataruangan.find(
        (Lkomputer) => Lkomputer.id === selectedId
      );

      // Membuat dokumen baru untuk mencetak data
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Ruangan</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr><th>ID</th><th>Nama</th><th>Instansi/Unit</th><th>Kegiatan</th><th>Jenis Kegiatan</th><th>Ruangan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th><th>Status</th></tr>"
      );

      printWindow.document.write("<tr>");
      printWindow.document.write("<td>" + dataToPrint.id + "</td>");
      printWindow.document.write("<td>" + dataToPrint.nama_peminjam + "</td>");
      printWindow.document.write("<td>" + dataToPrint.instansi + "</td>");
      printWindow.document.write("<td>" + dataToPrint.kegiatan + "</td>");
      printWindow.document.write("<td>" + dataToPrint.jenis_kegiatan + "</td>");
      printWindow.document.write("<td>" + dataToPrint.nama_ruangan + "</td>");
      printWindow.document.write(
        "<td>" + this.convertISOtoDate(dataToPrint.tanggal_peminjaman) + "</td>"
      );
      printWindow.document.write(
        "<td>" + this.convertISOtoDate(dataToPrint.tanggal_kembali) + "</td>"
      );
      printWindow.document.write(
        "<td>" + dataToPrint.status_peminjaman + "</td>"
      );
      printWindow.document.write("</tr>");

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
          title: "Peminjaman",
          disabled: true,
          href: "",
        },
        {
          title: "Data Ruangan",
          disabled: false,
          href: "",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("Lruangan/fetchDataruangan");
  },
};
</script>
<style scoped>
@media print {
  /* Gaya khusus untuk pencetakan */
  body {
    font-size: 12pt; /* Contoh: ubah ukuran font sesuai kebutuhan Anda */
    /* Tambahkan gaya lainnya sesuai kebutuhan Anda */
  }
}
</style>
