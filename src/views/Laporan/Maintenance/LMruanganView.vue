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
            <th>Nama PIC</th>
            <th>Ruangan</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(LMruangan, index) in getDataruanganmain"
            :key="LMruangan.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ LMruangan.id }}</td>
            <td>{{ LMruangan.nama }}</td>
            <td>{{ LMruangan.nama_ruangan }}</td>
            <td>{{ convertISOtoDate(LMruangan.tanggal_mulai) }}</td>
            <td>{{ convertISOtoDate(LMruangan.tanggal_berakhir) }}</td>
            <td>
              <v-icon @click="printData(LMruangan)">mdi-printer</v-icon>
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
    ...mapGetters("LMruangan", ["getDataruanganmain"]),
  },
  methods: {
    ...mapActions("LMruangan", ["fetchDataruanganmain"]),
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

    required(v) {
      return !!v || "wajib diisi";
    },
    exportDataToExcel() {
      const data = this.getDataruanganmain.map((LMruangan, index) => ({
        No: index + 1,
        ID: LMruangan.id,
        "Nama PIC": LMruangan.nama,
        Ruangan: LMruangan.nama_ruangan,
        "Tanggal Mulai": LMruangan.tanggal_mulai,
        "Tanggal Selesai": LMruangan.tanggal_berakhir,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      // Tambahkan header
      const header = [
        "No",
        "ID",
        "Nama PIC",
        "Ruangan",
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
      const fileName = "data maintenace ruangan.xlsx";
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
    printData(LMruangan) {
      console.log(LMruangan);
      // Membuat dokumen baru untuk mencetak data individu
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Ruangan</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr>  <th>ID</th><th>Nama PIC</th><th>Ruangan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>"
      );
      printWindow.document.write("<tr>");
      printWindow.document.write("<td>" + LMruangan.id + "</td>");
      printWindow.document.write("<td>" + LMruangan.nama + "</td>");
      printWindow.document.write("<td>" + LMruangan.nama_ruangan + "</td>");
      printWindow.document.write("<td>" + LMruangan.tanggal_mulai + "</td>");
      printWindow.document.write("<td>" + LMruangan.tanggal_berakhir + "</td>");
      printWindow.document.write("</tr>");
      printWindow.document.write("</table>");

      printWindow.document.write("</body></html>");
      printWindow.document.close();

      // Memanggil fungsi pencetakan bawaan browser
      printWindow.print();
      printWindow.close();
    },
    printAllData() {
      const dataToPrint = this.getDataruanganmain; // Mengambil semua data komputer dari Vuex store

      // Membuat dokumen baru untuk mencetak semua data
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Cetak Semua Data</title></head><body>"
      );

      // Menambahkan konten data ke dokumen cetak
      printWindow.document.write("<h1>Data Ruangan</h1>");
      printWindow.document.write('<table border="1">');
      printWindow.document.write(
        "<tr> <th>No</th><th>ID</th><th>Nama PIC</th><th>Ruangan</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th></tr>"
      );
      dataToPrint.forEach((LMruangan, index) => {
        printWindow.document.write("<tr>");
        printWindow.document.write("<td>" + (index + 1) + "</td>");
        printWindow.document.write("<td>" + LMruangan.id + "</td>");
        printWindow.document.write("<td>" + LMruangan.nama + "</td>");
        printWindow.document.write("<td>" + LMruangan.nama_ruangan + "</td>");
        printWindow.document.write("<td>" + LMruangan.tanggal_mulai + "</td>");
        printWindow.document.write(
          "<td>" + LMruangan.tanggal_berakhir + "</td>"
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
          title: "Data Ruangan",
          disabled: false,
          href: "",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("LMruangan/fetchDataruanganmain");
  },
};
</script>
