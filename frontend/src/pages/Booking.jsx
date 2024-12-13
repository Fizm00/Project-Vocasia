import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Booking/Header";
import DurasiNgekos from "../components/Booking/DurasiNgekos";
import TanggalMulai from "../components/Booking/TanggalMulai";
import InformasiPenyewa from "../components/Booking/InformasiPenyewa";
import CatatanTambahan from "../components/Booking/CatatanTambahan";
import RincianPembayaran from "../components/Booking/RincianPembayaran";
import { motion } from "framer-motion";

const Booking = () => {
  const [jumlahPenyewa, setJumlahPenyewa] = useState(1);
  const [durasi, setDurasi] = useState(1);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [totalBiaya, setTotalBiaya] = useState(1600000);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div>
      <Navbar />
      <main className="bg-white min-h-screen pt-8 px-4 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={fadeUp.transition}
            >
              <Header />
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <InformasiPenyewa />
            </motion.div>

            <motion.div
              className="mt-4 w-full lg:w-[70%] lg:ml-[2.5rem]"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
            >
              <hr className="border-gray-300" />
            </motion.div>

            {/* Durasi Ngekos */}
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.5 }}
            >
              <DurasiNgekos
                durasi={durasi}
                setDurasi={setDurasi}
                setTotalBiaya={setTotalBiaya}
                tanggalMulai={tanggalMulai}
              />
            </motion.div>

            <motion.div
              className="mt-4 w-full lg:w-[70%] lg:ml-[2.5rem]"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.6 }}
            >
              <hr className="border-gray-300" />
            </motion.div>

            {/* Tanggal Mulai */}
            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.7 }}
            >
              <TanggalMulai
                tanggalMulai={tanggalMulai}
                setTanggalMulai={setTanggalMulai}
                durasi={durasi} // Kirim durasi ke komponen TanggalMulai
              />
            </motion.div>

            <motion.div
              className="mt-4 w-full lg:w-[70%] lg:ml-[2.5rem]"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.8 }}
            >
              <hr className="border-gray-300" />
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.9 }}
            >
              <CatatanTambahan catatan={catatan} setCatatan={setCatatan} />
            </motion.div>
          </div>

          {/* Rincian Pembayaran */}
          <motion.div
            className="col-span-1"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <RincianPembayaran totalBiaya={totalBiaya} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
