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
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn
                color="success"
                append-icon="mdi-file-excel"
                @click="exportDataToExcel"
              >
                Kirim Ke Excel
              </v-btn>
            </v-col>

            <v-col cols="auto">
              <v-btn
                color="primary"
                append-icon="mdi-printer"
                @click="printTableData"
              >
                Cetak Data
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </div>
      <div id="printableArea">
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
              <td>{{ barang.nama_ruangan }}</td>
              <td>{{ convertISOtoDate(barang.tgl_peminjaman) }}</td>
              <td>{{ convertISOtoDate(barang.tgl_kembali) }}</td>
              <td>{{ barang.status_peminjaman }}</td>
              <td>
                <v-icon @click="printData(barang.id)">mdi-printer</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import * as XLSX from "xlsx";
import "moment/locale/id"; // Impor bahasa Indonesi
import moment from "moment";

import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("Lbarang", ["getDatabarang"]),
  },
  methods: {
    ...mapActions("Lbarang", ["fetchDatabarang"]),
    convertISOtoDate(isoString) {
      return moment.utc(isoString).locale("id").format("ddd MMM DD YYYY");
    },
 
    exportDataToExcel() {
      const data = this.getDatabarang.map((barang, index) => ({
        No: index + 1,
        "ID Barang": barang.id,
        "Nama Peminjam": barang.peminjam ,
        "Intansi unit": barang.instansi,
        "Jenis Barang": barang.jenis ,
        Ruangan: barang.nama_ruangan,
        "Tanggal Masuk": barang.tgl_peminjaman,
        "Tanggal Selesai": barang.tgl_kembali,
        status: barang.status_peminjaman,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      // Tambahkan header
      const header = [
        "No",
        "ID Barang",
        "Nama Peminjam",
        "Intansi Unit",
        "Jenis Barang",
        "Ruangan",
        "Tanggal Selesai",
        "Tanggal Masuk",
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
      const fileName = "data_barang.xlsx";
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
      const dataToPrint = this.getDatabarang;

      // Membuat dokumen baru untuk mencetak data
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Barang</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr><th>No</th><th>ID</th><th>Nama Peminjam</th><th>Instansi/Unit</th><th>Jenis Barang</th><th>Ruangan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>"
      );

      dataToPrint.forEach((barang, index) => {
        printWindow.document.write("<tr>");
        printWindow.document.write("<td>" + (index + 1) + "</td>");
        printWindow.document.write("<td>" + barang.id + "</td>");
        printWindow.document.write("<td>" + barang.peminjam + "</td>");
        printWindow.document.write("<td>" + barang.instansi + "</td>");
        printWindow.document.write("<td>" + barang.jenis + "</td>");
        printWindow.document.write("<td>" + barang.nama_ruangan + "</td>");
        printWindow.document.write(
          "<td>" + this.convertISOtoDate(barang.tgl_peminjaman) + "</td>"
        );
        printWindow.document.write(
          "<td>" + this.convertISOtoDate(barang.tgl_kembali) + "</td>"
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
      const dataToPrint = this.getDatabarang.find(
        (barang) => barang.id === selectedId
      );

      // Membuat dokumen baru untuk mencetak data
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Barang</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr><th>ID</th><th>Nama Peminjam</th><th>Instansi/Unit</th><th>Jenis Barang</th><th>Ruangan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>"
      );

      printWindow.document.write("<tr>");
      printWindow.document.write("<td>" + dataToPrint.id + "</td>");
      printWindow.document.write("<td>" + dataToPrint.peminjam + "</td>");
      printWindow.document.write("<td>" + dataToPrint.instansi + "</td>");
      printWindow.document.write("<td>" + dataToPrint.jenis + "</td>");
      printWindow.document.write("<td>" + dataToPrint.nama_ruangan + "</td>");
      printWindow.document.write(
        "<td>" + this.convertISOtoDate(dataToPrint.tgl_peminjaman) + "</td>"
      );
      printWindow.document.write(
        "<td>" + this.convertISOtoDate(dataToPrint.tgl_kembali) + "</td>"
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
          title: "peminjaman",
          disabled: true,
          href: "",
        },
        {
          title: "Data Barang",
          disabled: false,
          href: "",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("Lbarang/fetchDatabarang");
  },
};
</script>
