import React from "react";

const InformasiPenyewa = ({ user }) => {
  if (!user) {
    return <p>Loading data penyewa...</p>;
  }

  return (
    <section className="mt-4 space-y-4 lg:ml-[2.5rem]">
      <h2 className="text-xl font-bold text-gray-800">Informasi Penyewa</h2>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Nama Penyewa</h3>
        <p className="text-sm text-gray-600">
          {user.data.name || "Nama tidak tersedia"}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Email</h3>
        <p className="text-sm text-gray-600">
          {user.data.email || "Tidak tersedia"}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Nomor HP</h3>
        <p className="text-sm text-gray-600">
          {user.data.phone || "Nomor tidak tersedia"}
        </p>
      </div>
    </section>
  );
};

export default InformasiPenyewa;
