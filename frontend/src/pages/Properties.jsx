import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../config/axiosInstance";

const ITEMS_PER_PAGE = 12;

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        setProperties(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch properties: " + err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const deleteProperty = async (id) => {
    try {
      const propertyExists = properties.find((property) => property._id === id);
      if (!propertyExists) {
        alert("Properti tidak ditemukan.");
        return;
      }

      if (!window.confirm("Apakah Anda yakin ingin menghapus properti ini?")) return;

      const updatedProperties = properties.filter((property) => property._id !== id);
      setProperties(updatedProperties);

      const response = await axiosInstance.delete(`/property/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 && response.data.success) {
        alert(response.data.message || "Properti berhasil dihapus!");
      } else {
        throw new Error(response.data.message || "Gagal menghapus properti.");
      }
    } catch (error) {
      alert("Gagal menghapus properti: " + error.message);
      setProperties(properties);
    }
  };

  const indexOfLastProperty = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProperty = indexOfLastProperty - ITEMS_PER_PAGE;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl text-darkGreen font-extrabold">Daftar Kost Anda</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProperties.map((property) => (
            <div
              key={property._id}
              className="overflow-hidden bg-white rounded-lg shadow transition-all transform hover:scale-100 hover:shadow-lg"
            >
              <img
                src={property.images[0]}
                alt={property.name}
                className="object-cover w-full h-48 transition-all duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold truncate text-darkGreen">{property.name}</h3>
                <p className="mb-4 text-sm text-gray-500">{property.gender_type}</p>
                <p className="text-xs text-darkGreen mb-3">
                {property.city}, {property.address}
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-800 transition-all duration-300"
                    onClick={() => deleteProperty(property._id)}
                  >
                    Hapus Kost
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="flex items-center justify-center w-10 h-10 bg-white border rounded-md text-darkGreen border-darkGreen"
            >
              &lt;
            </button>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => paginate(pageNumber)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${pageNumber === currentPage
                    ? 'bg-darkGreen text-white'
                    : 'bg-white text-darkGreen border border-darkGreen'
                    }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              (pageNumber === currentPage - 2 && currentPage > 3) ||
              (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return <span key={index} className="px-2">...</span>;
            }
            return null;
          })}

          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="flex items-center justify-center w-10 h-10 bg-white border rounded-md text-darkGreen border-darkGreen"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}