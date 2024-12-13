import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const HeroSection = () => (
  <section
    className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/aboutImage.png')" }}
  >
    <div className="relative z-20 text-left text-white flex flex-col items-start justify-center min-h-screen px-20 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 transition-all duration-500 ease-out hover:scale-110 hover:translate-x-[-10px] hover:translate-y-2 leading-snug">
        AnakKost Hadir untuk Menyediakan Kost
        <br />
        Berkualitas dengan Fasilitas Terbaik!
      </h1>
      <p className="text-lg text-white mb-16 max-w-xl leading-relaxed mt-8 text-justify">
        AnakKost adalah platform pencarian kost terbaik di Indonesia yang
        memudahkan kamu menemukan hunian nyaman, strategis, dan ramah di
        kantong. Kami berkomitmen menyediakan informasi akurat dan fasilitas
        terbaik untuk pengalaman kost yang nyaman dan aman.
      </p>
    </div>
  </section>
);

const SectionWithImage = ({ title, subtitle, text, imgSrc, reverse }) => (
  <section
    className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : "md:flex-row"} justify-between items-center py-16 px-14 bg-white`}
  >
    <div className="w-full md:w-2/5 mb-8 md:mb-0">
      <img
        src={imgSrc}
        alt={title}
        className="w-full mt-4 h-auto object-cover rounded-xl"
      />
    </div>
    <div className="w-full md:w-2/4 md:pl-8 transition-all duration-700 hover:translate-x-[5px]">
      <h3 className="text-lg font-extrabold mb-8 text-[#78825B]">{title}</h3>
      <h2 className="text-2xl font-extrabold mb-8 text-[#193F3D]">{subtitle}</h2>
      <p className="text-sm mb-8 text-[#193F3D] text-justify">{text}</p>
    </div>
  </section>
);

const CommitmentSection = () => (
  <section className="py-12" style={{ backgroundColor: '#193F3D' }}>
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-extrabold text-white mb-8">
        Komitmen Kami untuk Penghuni Kost
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[ 
          { imgSrc: "/1-featAbout.png", title: "Kost-kostan Terjamin Aman", description: "Kami memastikan semua kost yang terdaftar memiliki lingkungan yang aman dan nyaman untukmu." },
          { imgSrc: "/2-featAbout.png", title: "Informasi yang Lengkap", description: "Data kost kami dirancang lengkap dengan foto, harga, fasilitas, dan detail lokasi yang jelas." },
          { imgSrc: "/3-featAbout.png", title: "Pemilik & Penghuni Terhubung", description: "AnakKost menjadi jembatan penghubung antara pemilik dan penghuni kost untuk berkomunikasi yang mudah." },
          { imgSrc: "/4-featAbout.png", title: "Harga Aman di Kantong", description: "Temukan pilihan kost terbaik dengan harga bersahabat sesuai kebutuhanmu." }
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-md rounded-lg transition-all duration-700 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={item.imgSrc}
              alt={item.title}
              className="mx-auto mb-4 h-12"
            />
            <h3 className="text-lg font-bold text-[#193F3D] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StatisticsSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold text-[#193F3D] mb-8">
        Tentang AnakKost
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[ 
          { value: "99%", label: "Kota Terjangkau" },
          { value: "40+", label: "Produk Kost Digital" },
          { value: "10jt+", label: "Penghuni Terdaftar" },
          { value: "20jt", label: "Kost Terdaftar di Platform" },
          { value: "10+", label: "Tahun Pengalaman" },
          { value: "97%", label: "Tingkat Kepuasan Pengguna" }
        ].map((stat, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-4xl font-bold text-[#193F3D] mb-2">{stat.value}</h3>
            <p className="text-lg text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SectionWithImage
        title="Tantangan AnakKost"
        subtitle="Kesulitan menemukan tempat tinggal yang nyaman dan terjangkau"
        text="Di Indonesia, banyak anak kost yang kesulitan mencari kost yang nyaman, aman, dan terjangkau, terutama di kota-kota besar dengan biaya hidup yang tinggi. Dengan beragamnya kebutuhan dan lokasi, pencarian kost yang sesuai sering kali memakan waktu dan tenaga, terutama bagi mahasiswa dan pekerja yang ingin menemukan tempat tinggal yang ideal."
        imgSrc="/tantanganAbout.png"
      />
      <SectionWithImage
        title="Misi AnakKost"
        subtitle="Mempermudah pencarian kost berkualitas dengan harga terjangkau"
        text="AnakKost hadir dengan misi untuk menyediakan solusi tempat tinggal yang nyaman, aman, dan ramah di kantong. Kami berkomitmen untuk mempermudah pencarian kost bagi siapa saja, dengan menyediakan informasi lengkap dan akurat, serta menjembatani antara pemilik kost dan penghuni dengan sistem yang mudah digunakan."
        imgSrc="/misiAbout.png"
        reverse={true}
      />
      <CommitmentSection />
      <StatisticsSection />
      <Banner />

      <section className="py-12 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#193F3D] mb-14 transition-all duration-200 hover:scale-105">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#193F3D] p-4 rounded-full w-48 mx-auto transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-13 h-13 rounded-full overflow-hidden mb-8">
                  <img
                    src="/amaliyahAbout.jpg" 
                    alt="Amaliyah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Amaliyah</h3>
                <p className="text-xs text-white mb-10">Front End Developer</p>
              </div>
            </div>
            <div className="bg-[#193F3D] p-4 rounded-full w-48 mx-auto transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-13 h-13 rounded-full overflow-hidden mb-4">
                  <img
                    src="/firzaAbout.jpg" 
                    alt="Firza Himawan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Firza Himawan</h3>
                <p className="text-xs text-white mb-10">Back End Developer</p>
              </div>
            </div>
            <div className="bg-[#193F3D] p-4 rounded-full w-48 mx-auto transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-13 h-13 rounded-full overflow-hidden mb-4">
                  <img
                    src="/nazwaAbout.jpg" 
                    alt="Nazwa Praditta"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Nazwa Praditta</h3>
                <p className="text-xs text-white mb-10">Front End Developer</p>
              </div>
            </div>
            <div className="bg-[#193F3D] p-4 rounded-full w-48 mx-auto transition-all duration-700 hover:scale-105 hover:shadow-xl">
              <div className="flex flex-col items-center">
                <div className="w-13 h-13 rounded-full overflow-hidden mb-4">
                  <img
                    src="/nurdianAbout.jpg"
                    alt="Nurdian Aprilianto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Nurdian Aprilianto</h3>
                <p className="text-xs text-white mb-10">Back End Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;