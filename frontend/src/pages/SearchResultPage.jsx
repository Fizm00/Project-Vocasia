import { useState, useEffect } from "react";
import NavbarSearch from "../components/NavbarSearch";
import ResultCard from "../components/ResultCard";
import PopupFilter from "../components/PopupFilter";
import MapComponent from "../components/MapComponent";

import axios from "../config/axiosInstance";

const SearchResultsPage = () => {
  const [filters, setFilters] = useState({
    tipeKost: "",
    lokasi: "",
    hargaMin: 0,
    hargaMax: 5000000,
    namaKost: "",
  });

  // const [kosts, setKosts] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchKosts = async () => {
      try {
        const response = await axios.get("/properties");
        setProperties(response.data.data);
        // setKosts(response.data);
        // const data = await response.json();
        // setKosts(data);
      } catch (error) {
        console.error("Error fetching kosts:", error);
      }
    };

    fetchKosts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsModalOpen(false);
  };

  const filteredKosts = properties.filter((kost) => {
    return (
      (filters.tipeKost
        ? kost.tipeKost.toLowerCase().includes(filters.tipeKost.toLowerCase())
        : true) &&
      (filters.lokasi
        ? kost.lokasi.toLowerCase().includes(filters.lokasi.toLowerCase())
        : true) &&
      kost.harga >= filters.hargaMin &&
      kost.harga <= filters.hargaMax &&
      (filters.namaKost
        ? kost.namaKost.toLowerCase().includes(filters.namaKost.toLowerCase())
        : true) &&
      (filters.durasi ? kost.durasi === filters.durasi : true)
    );
  });

  return (
    <div>
      {/* Navbar */}
      <NavbarSearch toggleFilterSidebar={openFilterModal} />

      <div className="flex">
        {/* Hasil Pencarian */}
        <div className="w-3/4 p-4">
          <div className="space-y-4">
            {filteredKosts.map((kost, index) => (
              <ResultCard key={index} kost={kost} />
            ))}
          </div>
        </div>

        {/* Peta Lokasi */}
        <div className="w-1/4 p-4">
          <MapComponent locations={filteredKosts} />
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
