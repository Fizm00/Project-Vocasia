import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhoneAlt, FaInstagram } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

function Contact() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true }); // Inisialisasi AOS
  }, []);

  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [error, setError] = useState({ email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error[name]) setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!formData.email.trim()) {
      setError((prev) => ({ ...prev, email: "Email tidak boleh kosong." }));
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(formData.email)) {
      setError((prev) => ({ ...prev, email: "Format email tidak valid." }));
      valid = false;
    }

    if (!formData.subject.trim()) {
      setError((prev) => ({ ...prev, subject: "Harap isi bidang ini." }));
      valid = false;
    }

    if (!formData.message.trim()) {
      setError((prev) => ({ ...prev, message: "Harap isi bidang ini." }));
      valid = false;
    }

    if (!valid) return;

    setError({});
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("Terima Kasih! Pesanmu berhasil dikirim!");
      setIsSubmitted(true);
      setFormData({ email: "", subject: "", message: "" });
    } catch {
      setError({ general: "Terjadi kesalahan, silakan coba lagi nanti." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#193F3D] text-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-2xl md:text-3xl font-extrabold mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Hubungi Kami
          </h1>
          <p
            className="text-lg font-medium mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Punya pertanyaan terkait AnakKost? Kirimkan pesan Anda, dan kami akan segera membantu!
          </p>
          <div
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <ContactInfo
              href="mailto:anakkost.company@gmail.com"
              icon={<FaEnvelope size={20} />}
              text="Email: anakkost.company@gmail.com"
            />
            <ContactInfo
              href="https://wa.me/085812345678"
              icon={<FaPhoneAlt size={20} />}
              text="Telepon: 085812345678"
            />
            <ContactInfo
              href="https://instagram.com/"
              icon={<FaInstagram size={20} />}
              text="Instagram: @anakkost"
            />
          </div>
        </div>
      </section>

      {/* Form Section */}
      <main
        className="flex-grow flex justify-center items-center py-6 md:py-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="p-4 md:p-6 space-y-4 w-full md:w-3/4 lg:w-1/2 xl:w-3/4">
          <h2
            className="text-2xl md:text-3xl font-semibold text-[#193F3D] text-center mb-4"
            data-aos="fade-up"
          >
            Kirimkan Pesan Anda
          </h2>
          <form onSubmit={handleSubmit}>
            <InputField
              id="email"
              label="Email Anda"
              type="email"
              value={formData.email}
              error={error.email}
              onChange={handleChange}
              data-aos="fade-up"
              data-aos-delay="200"
            />
            <InputField
              id="subject"
              label="Subject"
              type="text"
              value={formData.subject}
              error={error.subject}
              onChange={handleChange}
              data-aos="fade-up"
              data-aos-delay="200"
            />
            <TextAreaField
              id="message"
              label="Pesan"
              value={formData.message}
              error={error.message}
              onChange={handleChange}
              data-aos="fade-up"
              data-aos-delay="200"
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 mt-6 rounded-md text-white text-lg font-semibold ${
                isLoading ? "cursor-not-allowed" : "bg-[#193F3D] hover:bg-[#145F5D]"
              }`}
              disabled={isLoading}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {isLoading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const ContactInfo = ({ href, icon, text }) => (
  <div className="flex items-center space-x-2">
    <a
      href={href}
      className="bg-white p-3 rounded-full text-[#193F3D] hover:text-gray-300 transition-transform duration-500 hover:scale-110"
    >
      {icon}
    </a>
    <p className="text-sm font-medium">{text}</p>
  </div>
);

const InputField = ({ id, label, type, value, error, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-[#193F3D]">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      className={`block w-full px-3 py-2 focus:ring-[#193F3D] focus:border-[#193F3D] outline-none sm:text-sm border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md mb-4`}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
  </div>
);

const TextAreaField = ({ id, label, value, error, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-[#193F3D]">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows="5"
      className={`block w-full px-3 py-2 focus:ring-[#193F3D] focus:border-[#193F3D] outline-none sm:text-sm border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md mb-4`}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  </div>
);

export default Contact;
