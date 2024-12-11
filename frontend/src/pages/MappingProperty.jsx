import React from "react";
import axiosInstance from "../config/axiosInstance";
// import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";
import { FaBath, FaBed, FaCar, FaStar, FaWifi } from "react-icons/fa";

const PropertyList = () => {
  //   const [properties, setProperties] = useState([]);

  //   useEffect(() => {
  //     // Fetch data dari API
  //     const fetchProperties = async () => {
  //       try {
  //         const response = await axios.get("/properties");
  //         setProperties(response.data.data); // Simpan data ke state
  //       } catch (error) {
  //         console.error("Error fetching properties:", error);
  //       }
  //     };

  //     fetchProperties(); // Panggil fungsi fetch
  //   }, []); // Dependency array kosong untuk fetch sekali saat komponen mount

  //   return (
  //     <div className="container">
  //       <h1>Daftar Kost</h1>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //         {properties.map((property) => (
  //           <div key={property._id} className="border p-4 rounded shadow-lg">
  //             <h2 className="text-xl font-bold">{property.name}</h2>
  //             <p>Lokasi: {property.city}</p>
  //             <p>Alamat: {property.address}</p>
  //             <p>Harga: Rp {property.price.toLocaleString()}</p>
  //             <p>Fasilitas: {property.facility.join(", ")}</p>
  //             <div className="grid grid-cols-2 gap-2 mt-2">
  //               {/* Render gambar dari array images atau image */}
  //               {property.images?.length > 0 ? (
  //                 property.images.map((url, index) => (
  //                   <img
  //                     key={index}
  //                     src={url.replace(
  //                       "D:\\CODING\\MSIB\\final-project\\Project-Vocasia\\backend\\middleware\\storages\\uploads",
  //                       "http://localhost:5000/uploads"
  //                     )}
  //                     alt={`Gambar ${property.name}`}
  //                     className="rounded"
  //                   />
  //                 ))
  //               ) : (
  //                 <img
  //                   src={`http://localhost:3000/storages/uploads/images/${property._id}/${property.image}`}
  //                   alt={`Gambar ${property.name}`}
  //                   className="rounded"
  //                 />
  //               )}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };
  const navigate = useNavigate();
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        if (Array.isArray(response.data.data)) {
          setProperties(response.data.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(harga);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property._id}
          className="border rounded-lg shadow-lg overflow-hidden bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={() => navigate(`/detail/${property._id}`)}
        >
          {/* Gambar */}
          {property.images && property.images.length > 0 && (
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Informasi Properti */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{property.name}</h3>
            <p className="text-sm text-gray-600">{property.address}</p>
            <p className="text-sm text-gray-600">
              Lokasi: {property.city || "Tidak diketahui"}
            </p>
            <p className="text-lg font-bold text-gray-900">
              {formatHarga(property.price)}
            </p>

            {/* Fasilitas */}
            <div className="flex items-center space-x-4 text-sm mt-2">
              {property.facility.includes("tempatTidur") && (
                <div className="flex items-center space-x-1">
                  <FaBed />
                  <span>Tempat Tidur</span>
                </div>
              )}
              {property.facility.includes("kamarMandi") && (
                <div className="flex items-center space-x-1">
                  <FaBath />
                  <span>Kamar Mandi</span>
                </div>
              )}
              {property.facility.includes("parkir") && (
                <div className="flex items-center space-x-1">
                  <FaCar />
                  <span>Parkir</span>
                </div>
              )}
              {property.facility.includes("wifi") && (
                <div className="flex items-center space-x-1">
                  <FaWifi />
                  <span>Wi-Fi</span>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 space-x-1 mt-2">
              <FaStar />
              <span>{property.rating || "0.0"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
