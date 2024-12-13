import React from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaCreditCard, FaUserPlus } from 'react-icons/fa';

const Menu = ({image}) => {
    return (
        <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
            <div className="p-6 pl-8 bg-white rounded-lg shadow-lg border">
                <div className="flex items-center mb-4">
                    <img
                        src={image || 'https://via.placeholder.com/100'}
                        alt="User"
                        className="rounded-full w-12 h-12 mr-2 object-cover"
                    />
                    <span className="text-lg font-bold">John Doe</span>
                </div>
                <hr className="w-full my-4 border-t-1 border-gray-300" />
                <div className="space-y-4">
                    <Link to="/riwayat-sewa" className="flex items-center text-gray-800">
                        <FaHistory className="mr-2" />  {/* Riwayat Pengajuan Sewa */}
                        <p>Riwayat Pengajuan Sewa</p>
                    </Link>
                    <Link to="/riwayat-transaksi" className="flex items-center text-gray-800">
                        <FaCreditCard className="mr-2" />  {/* Riwayat Transaksi */}
                        <p>Riwayat Transaksi</p>
                    </Link>
                </div>
            </div>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border">
                <p className="mb-2 text-lg font-bold">Kamu Punya Kost?</p>
                <hr className="w-full my-4 border-t-1 border-gray-300" />
                <p className="text-md mb-4">Upgrade akun kamu menjadi pemilik kost dan bergabung bersama kami!</p>
                <Link to="/verifikasi" className="flex justify-center items-center font-semibold bg-darkGreen py-2 px-4 rounded-lg text-white hover:bg-white hover:text-darkGreen hover:border hover:border-darkGreen">
                    <FaUserPlus className="mr-2" />  {/* Verifikasi */}
                    <p>Daftar Sekarang</p>
                </Link>
            </div>
        </div>
    );
};

export default Menu;
