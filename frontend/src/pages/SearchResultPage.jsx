import React, { useState } from 'react';
import NavbarSearch from '../components/NavbarSearch'; // Pastikan pathnya benar
import ResultCard from '../components/ResultCard'; // Pastikan pathnya benar
import PopupFilter from '../components/PopupFilter'; 
import MapComponent from '../components/MapComponent';

const SearchResultsPage = () => {
  const [filters, setFilters] = useState({
    tipeKost: '',
    lokasi: '',
    hargaMin: 0,
    hargaMax: 5000000,
    namaKost: ''
  });

  const [kosts, setKosts] = useState([
    {
      id: 1,
      namaKost: 'Kost Trinanda',
      tipeKost: 'Putri',
      lokasi: 'Depok, -6.400000, 106.800000',
      fasilitas: { tempatTidur: 2, kamarMandi: 1, parkir: 1, wifi: 1 },
      rating: 4.7,
      harga: 500000,
      durasi: 'Bulan',
      ketersediaan: '2',
      image: 'https://i0.wp.com/prolegal.id/wp-content/uploads/2022/05/Ilustrasi-kamar-kos-kosan.jpg?fit=1000%2C667&ssl=1',
    },
    {
      id: 2,
      namaKost: 'Kost Putra Alpha',
      tipeKost: 'Putra',
      lokasi: 'Jakarta, Jalan Merdeka 1',
      fasilitas: { tempatTidur: 1, kamarMandi: 1, parkir: 1 },
      rating: 4.5,
      harga: 600000,
      durasi: 'Bulan',
      ketersediaan: '1',
      image: 'https://sgp1.digitaloceanspaces.com/www.sewakost.com-66ae3a396f56c/listings/03-2020/ad33759/kost-ac-putra-dekat-ui-1441618486_large.jpg',
    },
    {
      id: 3,
      namaKost: 'Kost Cendana',
      tipeKost: 'Putra',
      lokasi: 'Surabaya, Jalan Raya 3',
      fasilitas: { tempatTidur: 1, kamarMandi: 1, parkir: 1 },
      rating: 4.3,
      harga: 50000,
      durasi: 'Hari',
      ketersediaan: '5',
      image: 'https://www.harapanrakyat.com/wp-content/uploads/2022/06/Desain-Kamar-Kost-Pria-Terkesan-Maskulin-Namun-Sederhana.jpg',
    },
    {
      id: 4,
      namaKost: 'Kost Alimun',
      tipeKost: 'Campur',
      lokasi: 'Bandung, Jalan Dago 5',
      fasilitas: { tempatTidur: 2, kamarMandi: 1, parkir: 1, wifi: 1 },
      rating: 4.1,
      harga: 1000000,
      durasi: 'Bulan',
      ketersediaan: '3',
      image: 'https://www.griyasatria.co.id/wp-content/uploads/2021/05/rumah-kost.png',
    },
    {
      id: 5,
      namaKost: 'Kost Srikandi',
      tipeKost: 'Putri',
      lokasi: 'Yogyakarta, Jalan Malioboro 7',
      fasilitas: { tempatTidur: 1, kamarMandi: 1, wifi : 1 },
      rating: 4.6,
      harga: 100000,
      durasi: 'Hari',
      ketersediaan: '4',
      image: 'https://www.rukita.co/stories/wp-content/uploads/2022/06/EWU_4W6U4AEpc_Z.jpg',
    },
  ]);  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openFilterModal = () => {
    setIsModalOpen(true); // Membuka modal
  };

  const closeFilterModal = () => {
    setIsModalOpen(false); // Menutup modal
  };

  const filteredKosts = kosts.filter(kost => {
    return (
      (filters.tipeKost ? kost.tipeKost.toLowerCase().includes(filters.tipeKost.toLowerCase()) : true) &&
      (filters.lokasi ? kost.lokasi.toLowerCase().includes(filters.lokasi.toLowerCase()) : true) &&
      (kost.harga >= filters.hargaMin && kost.harga <= filters.hargaMax) &&
      (filters.namaKost ? kost.namaKost.toLowerCase().includes(filters.namaKost.toLowerCase()) : true) &&
      (filters.durasi ? kost.durasi === filters.durasi : true)
    );
  });

  return (
    <div>
      {/* Navbar */}
      <NavbarSearch toggleFilterSidebar={openFilterModal} /> {/* Mengubah toggle menjadi openFilterModal */}

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
