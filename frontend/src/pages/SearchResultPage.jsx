import React, { useEffect, useState } from "react";
import NavbarSearch from "../components/SearchPage/NavbarSearch";
import ResultCard from "../components/SearchPage/ResultCard";
import PopupFilter from "../components/SearchPage/PopupFilter";
import axiosInstance from "../config/axiosInstance";

const SearchResultsPage = () => {
  const [filters, setFilters] = useState({
    property_type: "",
    city: "",
    price_min: 0,
    price_max: 5000000,
    name: "",
  });

  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State baru untuk search query
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const apiUrl = "http://localhost:3000/api/v1";
  useEffect(() => {
    const fetchedProperty = async () => {
      try {
        const response = await axiosInstance.get("/properties");
        console.log("fetched property", response.data.data);
        setKosts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error: " + error.message);
        setLoading(false);
      }
    };
    fetchedProperty();
  }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     console.log("Kosts after fetch:", kosts);
  //   }
  // }, [loading, kosts]);

  // useEffect(() => {
  //   console.log("Initial kosts state:", kosts);
  // }, [kosts]);

  const openFilterModal = () => {
    setIsModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsModalOpen(false);
  };

  // Filter data berdasarkan input searchQuery dan filter lainnya
  const filteredKosts = kosts.filter((kost) => {
    return (
      (searchQuery
        ? kost.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true) &&
      (filters.property_type
        ? kost.property_type
            .toLowerCase()
            .includes(filters.property_type.toLowerCase())
        : true) &&
      (filters.city
        ? kost.city.toLowerCase().includes(filters.city.toLowerCase())
        : true) &&
      kost.price >= filters.price_min &&
      kost.price <= filters.price_max
    );
  });

  // Render UI
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Navbar */}
      <NavbarSearch toggleFilterSidebar={openFilterModal} setSearchQuery={setSearchQuery} />

      <div className="flex flex-wrap gap-2">
        {/* Hasil Pencarian - Dua Kolom */}
        <div className="w-full md:w-[48%] p-4">
          <div className="space-y-4">
            {filteredKosts
              .slice(0, Math.ceil(filteredKosts.length / 2))
              .map((kost, index) => (
                <ResultCard key={index} kost={kost} />
              ))}
          </div>
        </div>

        <div className="w-full md:w-[48%] p-4">
          <div className="space-y-4">
            {filteredKosts
              .slice(Math.ceil(filteredKosts.length / 2))
              .map((kost, index) => (
                <ResultCard key={index} kost={kost} />
              ))}
          </div>
        </div>
      </div>

      {/* Modal Filter */}
      {isModalOpen && (
        <PopupFilter
          filters={filters}
          setFilters={setFilters}
          closeFilterModal={closeFilterModal}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;