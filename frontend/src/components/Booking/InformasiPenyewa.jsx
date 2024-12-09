import React from "react";

const InformasiPenyewa = () => {
  return (
    <section className="mt-4 space-y-4 lg:ml-[2.5rem]">
      <h2 className="text-xl font-bold text-gray-800">Informasi Penyewa</h2>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Nama Penyewa</h3>
        <p className="text-sm text-gray-600">Nama User</p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Nomor HP</h3>
        <p className="text-sm text-gray-600">0812345678</p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Jenis Kelamin</h3>
        <p className="text-sm text-gray-600">Laki-laki</p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800">Pekerjaan</h3>
        <p className="text-sm text-gray-600">Mahasiswa</p>
      </div>
    </section>
  );
};

export default InformasiPenyewa;
