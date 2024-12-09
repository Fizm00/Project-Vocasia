import React from "react";

const PaymentChoice = () => {
  const wallets = [
    { name: "Gopay", logo: "/logos/gopay.png" },
    { name: "OVO", logo: "/logos/ovo1.png" },
    { name: "Dana", logo: "/logos/dana1.png" },
    { name: "ShopeePay", logo: "/logos/Shopeepay1.png" },
    { name: "LinkAja", logo: "/logos/LinkAja.png" },
    { name: "Flip", logo: "/logos/Flip.png" },
  ];

  const mbanking = [
    { name: "BNI", logo: "/logos/bni1.png" },
    { name: "Mandiri", logo: "/logos/mandiri2.png" },
    { name: "BRI", logo: "/logos/bri.png" },
  ];

  return (
    <div className="mt-4 lg:w-[70%] lg:ml-[5rem] lg:px-10 pb-10">
      {" "}
      {/* Section Title */}
      <h2 className="text-lg font-bold text-gray-800">E-Wallet</h2>
      {/* Wallet Grid */}
      <div className="grid grid-cols-3 gap-6 mt-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.name}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-lg py-8 hover:shadow-lg transition-shadow"
          >
            <img
              src={wallet.logo}
              alt={wallet.name}
              className="w-12 h-12 object-contain"
            />
            <span className="text-md font-semibold text-gray-400 mt-4">
              {wallet.name}
            </span>
          </div>
        ))}
      </div>
      {/* Horizontal Line */}
      <div className="mt-6">
        <hr className="border-gray-300" />
      </div>
      {/* M-Banking Section */}
      <h2 className="text-lg font-bold text-gray-800 mt-6">M-Banking</h2>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {mbanking.map((bank) => (
          <div
            key={bank.name}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-lg py-8 hover:shadow-lg transition-shadow"
          >
            <img
              src={bank.logo}
              alt={bank.name}
              className={`${
                bank.name === "BNI" || bank.name === "Mandiri"
                  ? "w-20 h-20"
                  : "w-12 h-12"
              } object-contain`}
            />
            <span className="text-md font-semibold text-gray-400 mt-4">
              {bank.name}
            </span>
          </div>
        ))}
      </div>
      {/* Horizontal Line */}
      <div className="mt-6">
        <hr className="border-gray-300" />
      </div>
      {/* COD Section */}
      <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-5 mt-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center lg:px-10 space-x-5">
          <span className="font-bold text-lg text-gray-800">COD</span>
          <span className="text-sm text-gray-500">
            (Bayar di tempat saat check-in)
          </span>
        </div>
      </div>
      {/* Bayar Button */}
      <div className="mt-8 mb-8">
        {" "}
        {/* Tambah margin bawah */}
        <button className="w-full bg-darkGreen text-white text-center px-6 py-2 rounded-lg hover:bg-green-700 transition-all">
          Bayar
        </button>
      </div>
    </div>
  );
};

export default PaymentChoice;
