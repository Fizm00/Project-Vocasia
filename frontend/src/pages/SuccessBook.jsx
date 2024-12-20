import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdLocationOn } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import { BsCheckCircle } from "react-icons/bs";
import { getBookingsById } from "../api/booking";
import { getPropertyById } from "../api/property";

const SuccessBook = () => {
  const [booking, setBooking] = useState(null);
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch booking data
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching booking data with ID:", id);

        const bookingResponse = await getBookingsById(id);
        const bookingData = bookingResponse.data

        if (!bookingData) {
          throw new Error("Data booking tidak ditemukan.");
        }

        console.log("Booking data:", bookingData);
        setBooking(bookingData);
      } catch (error) {
        console.error("Error fetching booking data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  // Fetch property data after booking is set
  useEffect(() => {
    const fetchProperty = async () => {
      if (!booking || !booking.property_id) return;

      try {
        console.log("Fetching property data with ID:", booking.property_id);

        const propertyResponse = await getPropertyById(booking.property_id);
        const propertyData = propertyResponse?.data?.data;

        if (!propertyData) {
          throw new Error("Data properti tidak ditemukan.");
        }

        console.log("Property data:", propertyData);
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property data:", error.message);
      }
    };

    fetchProperty();
  }, [booking]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!booking || !property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 mb-9">
        <Navbar />
        <main className="container mx-auto flex-grow px-4 lg:px-8 py-4 bg-white rounded-lg shadow-lg mt-4">
          <h2 className="text-lg font-semibold text-red-600 mb-6 flex items-center">
            Data tidak ditemukan
          </h2>
          <div className="flex justify-center">
            <p className="text-gray-800 text-lg">
              Kami tidak dapat menemukan informasi booking atau properti.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 lg:px-8 py-4 mt-0">
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 flex flex-col justify-start">
              <div className="flex items-center mb-4">
                <button
                  onClick={handleBack}
                  className="mr-4 text-[#193F3D] hover:text-green-600 text-xl font-bold"
                >
                  <SlArrowLeft size={18} className="font-semibold" />
                </button>
                <h1 className="text-2xl font-extrabold text-gray-800 flex items-center">
                  Pengajuan Sewa Berhasil!{" "}
                  <BsCheckCircle className="ml-2 text-green-700 text-2xl" />
                </h1>
              </div>
              <div className="space-y-6 mt-2">
                <h3 className="text-md font-bold text-gray-800 mt-4">
                  Detail Pengajuan
                </h3>
                <div className="space-y-6 text-gray-900 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">No. Invoice</span>
                    <span className="text-gray-800">{booking.payment?.transaction_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Dibayar pada</span>
                    <span>
                      {booking.start_date
                        ? new Date(booking.start_date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status Transaksi</span>
                    <span className="text-gray-800">Sukses</span>
                  </div>
                  <div className="flex justify-start mt-8">
                    <Link
                      to="/add-review"
                      className="bg-[#193F3D] text-white mt-14 px-7 py-2 rounded-md hover:bg-green-900 text-sm shadow-md transition-all"
                    >
                      Tambahkan Review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 p-4 mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl hover:scale-105 hover:translate-y-2">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="rounded-md w-16 h-16 object-cover"
                />
                <div className="flex flex-col justify-center">
                  <button className="px-3 py-0 text-xs font-normal rounded-full bg-[#DADCC0] text-[#193F3D] w-fit mt-1">
                    {property.gender_type}
                  </button>
                  <p className="text-gray-800 font-bold text-sm mt-2 mb-1">{property.name}</p>
                  <div className="flex items-center text-xs text-gray-600 space-x-2">
                    <MdLocationOn className="text-gray-600 text-sm" />
                    <span className="text-xs">{property.city}</span>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="space-y-4 text-gray-900">
                <p className="text-gray-800 font-semibold text-xs">Informasi Sewa</p>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Tanggal Masuk</span>
                  <span>
                    {booking.start_date
                      ? new Date(booking.start_date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Tanggal Keluar</span>
                  <span>
                    {booking.end_date
                      ? new Date(booking.end_date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Biaya Sewa Kos</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(booking.total_price)}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold text-xs">
                  <span>Total Pembayaran</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(booking.total_price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessBook;
