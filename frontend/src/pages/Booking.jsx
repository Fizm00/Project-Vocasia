import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Booking/Header";
import DurasiNgekos from "../components/Booking/DurasiNgekos";
import TanggalMulai from "../components/Booking/TanggalMulai";
import InformasiPenyewa from "../components/Booking/InformasiPenyewa";
import CatatanTambahan from "../components/Booking/CatatanTambahan";
import RincianPembayaran from "../components/Booking/RincianPembayaran";
// import { getBookings, createBooking } from "../api/booking";
import { format, addMonths } from "date-fns";
import idLocale from "date-fns/locale/id";
import { motion } from "framer-motion";

import axiosInstance from "../config/axiosInstance";

const Booking = () => {
  const [durasi, setDurasi] = useState(1);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [catatan, setCatatan] = useState("");
  const [totalBiaya, setTotalBiaya] = useState("");
  //new
  // const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(null);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axiosInstance.get(`/user/${user_id}`);
        setUser(response.data);
        console.log("User Data:", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const property_id = localStorage.getItem("property_id");
        const response = await axiosInstance.get(`/property/${property_id}`);
        setProperty(response.data);
        console.log("Booking|Fetched Property:", response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [durasi, totalBiaya]);

  useEffect(() => {
    if (property && Number(property.data.price) && durasi) {
      const calculateTotalBiaya = () => {
        const harga = Number(property.data.price);
        const total = harga * durasi;
        setTotalBiaya(total);
      };
      calculateTotalBiaya();
    }
  }, [durasi, property]);

  useEffect(() => {
    console.log("durasi:", durasi);
    console.log("tanggalMulai:", tanggalMulai);
    console.log("tanggalAkhir:");
    console.log("property:" + localStorage.getItem("property_id"));
  }, [durasi, tanggalMulai, totalBiaya, property]);

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
              <InformasiPenyewa user={user} />
            </motion.div>

            <motion.div
              className="mt-4 w-full lg:w-[70%] lg:ml-[2.5rem]"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
            >
              <hr className="border-gray-300" />
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.9 }}
            >
              <CatatanTambahan
                catatan={catatan}
                setCatatan={setCatatan}
                setTanggalAkhir={setTanggalAkhir}
                setTanggalMulai={setTanggalMulai}
              />
            </motion.div>
          </div>

          {/* Rincian Pembayaran */}
          <motion.div
            className="col-span-1"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <RincianPembayaran
              totalBiaya={totalBiaya}
              property={property}
              durasi={durasi}
              tanggalMulai={tanggalMulai}
              tanggalAkhir={tanggalAkhir}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
