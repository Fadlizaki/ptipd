<template>
  <v-container>
    <h1 class="mb-6">Dashboard</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          class="rounded-lg"
          theme="dark"
          style="background: linear-gradient(to right, #5ab394, #a8e0cc)"
        >
          <div class="d-flex flex-no-wrap justify-center">
            <div class="py-8">
              <v-card-text class="text-h1 text-md-h5 text-lg-h2 ml-lg-10 ml-4"
                >  {{ totalComputers }}</v-card-text
              >
              <v-card-title class="text-h5 text-md-h5 text-lg-caption ml-7"
                >Total Komputer
              </v-card-title>
            </div>

            <v-avatar class="ma-3" size="100" rounded="0">
              <v-icon size="100">mdi-monitor</v-icon>
            </v-avatar>
          </div>
          <v-btn block rounded="xl" size="x-small" color="#19A876" to="/datakomputer">Lihat</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          class="rounded-lg"
          theme="dark"
          style="background: linear-gradient(to right, #e70b0b, #f38585)"
        >
          <div class="d-flex flex-no-wrap justify-center">
            <div class="py-8">
              <v-card-text class="text-h1 text-md-h5 text-lg-h2 ml-lg-10 ml-4"
                >{{totalcomputerrusak}}</v-card-text
              >
              <v-card-title class="text-h5 text-md-h5 text-lg-caption ml-7">
                Komputer Rusak
              </v-card-title>
            </div>

            <v-avatar class="ma-3" size="100" rounded="0">
              <v-icon size="100">mdi-monitor-off</v-icon>
            </v-avatar>
          </div>
          <v-btn block rounded="xl" size="x-small" color="#C8102E" to="/mbarang">Lihat</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          class="rounded-lg"
          theme="dark"
          style="background: linear-gradient(to right, #77c7fb, #bbe3fd)"
        >
          <div class="d-flex flex-no-wrap justify-center">
            <div class="py-8">
              <v-card-text class="text-h1 text-md-h5 text-lg-h2 ml-lg-10 ml-4"
                >{{totalbarangpinjam}}</v-card-text
              >
              <v-card-title class="text-h5 text-md-h5 text-lg-caption ml-7"
                >Barang Dipinjam
              </v-card-title>
            </div>

            <v-avatar class="ma-3" size="100" rounded="0">
              <v-icon size="100">mdi-devices</v-icon>
            </v-avatar>
          </div>
          <v-btn block rounded="xl" size="x-small" color="#5093BE" to="/jlbarang">Lihat</v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          class="rounded-lg"
          theme="dark"
          style="background: linear-gradient(to right, #7b57e0, #bdabf0)"
        >
          <div class="d-flex flex-no-wrap justify-center">
            <div class="py-8">
              <v-card-text class="text-h1 text-md-h5 text-lg-h2 ml-lg-10 ml-4"
                >{{totalruangan}}</v-card-text
              >
              <v-card-title class="text-h5 text-md-h5 text-lg-caption ml-8"
                >Ruangan Dipinjam
              </v-card-title>
            </div>

            <v-avatar class="ma-3" size="100" rounded="0">
              <v-icon size="100">mdi-door</v-icon>
            </v-avatar>
          </div>
          <v-btn block rounded="xl" size="x-small" color="#7D58E4" to="/jlruangan">Lihat</v-btn>
        </v-card>
        <v-card class="mx-auto" max-width="368"> </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="12">
        <canvas id="myChart"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
          datasets: [
            {
              label: 'Item A',
              data: [60, 80, 30, 50, 20, 100],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Item B',
              data: [75, 50, 40, 35, 45, 60],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Item C',
              data: [40, 25, 60, 30, 75, 35],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Item D',
              data: [20, 45, 55, 10, 70, 65],
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
            },
            {
              label: 'Item E',
              data: [50, 40, 30, 15, 55, 20],
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            },
            {
              label: 'Item F',
              data: [35, 60, 20, 40, 15, 45],
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              barPercentage: 0.4,
              categoryPercentage: 0.5
            },
            y: {
              beginAtZero: true,
              max: 100
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          layout: {
            padding: 10
          },
          barThickness: 8
        }
      });
    }
  },
  computed: {
  
totalComputers() {
  return this.$store.getters['komputer/totalComputers'];
},
totalcomputerrusak(){
  return this.$store.getters['mbarang/totalbarangmain']
},
totalruangan() {
  return this.$store.getters['ruangans/totalruangan'];
},
totalbarangpinjam(){
  return this.$store.getters['barang/totalpinjambarang']
}
},
created() {
this.$store.dispatch("komputer/fetchDataKomputer");
this.$store.dispatch("mbarang/fetchDatabarangmain");
this.$store.dispatch("ruangans/fetchDataruangan");
this.$store.dispatch("barang/fetchDatabarang");
},
}

</script>

<style scoped></style>
