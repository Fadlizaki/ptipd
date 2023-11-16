import { createStore } from "vuex";
import komputer from "./modules/Master data/komputer";
import ppkomputer from "./modules/Jadwal peminjaman/komputer";
import Lkomputer from "./modules/Laporan/Lkomputer";
import LMruangan from "./modules/Laporan/Maintenace/LMruangan";
import LMbarang from "./modules/Laporan/Maintenace/LMbarang";
import laptop from "./modules/Master data/laptop";
import lain from "./modules/Master data/lain";
import ruangan from "./modules/Master data/ruangan";
import merk from "./modules/Setelan/merk";
import tipe from "./modules/Setelan/tipe";
import auth from "./modules/auth";
import user from "./modules/Akun/user";
import ruangans from "./modules/Jadwal peminjaman/ruangan";
import barang from "./modules/Jadwal peminjaman/barang";
import mruangan from "./modules/Maintenance/mruangan";
import mbarang from "./modules/Maintenance/mbarang";
import Lbarang from "./modules/Laporan/Peminjaman/Lbarang";
import Lruangan from "./modules/Laporan/Peminjaman/Lruangan";


const store = createStore({
  state: {
    isLoading: false,
  },
  modules: {
    komputer,
    Lkomputer,
    LMruangan,
    LMbarang,
    laptop,
    lain,
    ruangan,
    merk,
    tipe,
    auth,
    user,
    ruangans,
    barang,
    mruangan,
    mbarang,
    Lruangan,
    Lbarang,
    ppkomputer,
  },
  getters: {
    totalComputers: (state) => {
      if (state.komputer.dataKomputer.length !== state.totalComputers) {
        state.totalComputers = state.komputer.dataKomputer.length;
      }
      return state.totalComputers;
    },
    // ...
  }
});

export default store;
