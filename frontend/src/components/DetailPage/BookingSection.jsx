import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPhoneAlt } from "react-icons/fa";

const BookingSection = ({ kostDetail }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [jumlahDurasi, setjumlahDurasi] = useState(1);
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking', {
      state: { kostDetail, startDate, jumlahDurasi },
    });
  };

  const handleContactOwner = () => {
    const phone = kostDetail.user.phone;
    const formattedPhone = `62${phone.substring(1)}`; 
    window.location.href = `https://wa.me/${formattedPhone}`;
  };

  return (
    <div className="p-2 max-w-md mx-auto">
      {/* Harga dan Durasi */}
      <div className="flex flex-wrap justify-between space-x-1 mb-4">
        <div className="w-full md:w-2/3">
          <p className="text-xl font-bold">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(kostDetail.harga)}
            <span className="text-gray-500 text-sm md:text-md font-semibold">/{kostDetail.durasi}</span>
          </p>
        </div>
        <div className="w-full mt-2 border border-darkGreen text-center py-1 px-4 rounded-md md:mt-4 md:px-1">
          <p className="text-sm md:text-md text-darkGreen font-bold">{kostDetail.tipeKost}</p>
        </div>
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />


      {/* Tombol Pemesanan */}
      <div className="space-y-4 mt-4">
        <button
          onClick={handleContactOwner}
          className="flex items-center justify-center w-full bg-darkGreen text-white font-semibold p-3 rounded-full hover:bg-white hover:text-darkGreen border border-darkGreen transition duration-300 ease-in-out"
        >
          <FaPhoneAlt className="mr-2" /> Hubungi Pemilik
        </button>
        <button
          onClick={handleBooking}
          className="w-full bg-darkGreen text-white font-semibold p-3 rounded-full hover:bg-white hover:text-darkGreen border border-darkGreen transition duration-300 ease-in-out"
        >
          Ajukan Sewa
        </button>
      </div>
    </div>
  );
};

export default BookingSection;
