import React from "react";
import Navbar from "../components/Navbar";
import PaymentHeader from "../components/Payment/PaymentHeader";
import PaymentChoice from "../components/Payment/PaymentChoice";
import RincianPembayaran from "../components/Payment/RincianPembayaran";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeOut" },
};

const Payment = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-white min-h-screen pt-8 px-4 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Kolom Kiri: Header & E-Wallet */}
          <motion.div
            className="lg:col-span-3"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={fadeUp.transition}
          >
            <PaymentHeader />
            <PaymentChoice />
          </motion.div>

          {/* Kolom Kanan: Rincian Pembayaran */}
          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition }}
          >
            <RincianPembayaran totalBiaya={1600000} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payment;