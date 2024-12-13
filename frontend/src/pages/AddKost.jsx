import React, { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import DescriptionSection from "../components/AddKost/DescriptionSection";
import PropertyDetails from "../components/AddKost/PropertyDetails";
import PriceAndLocationSection from "../components/AddKost/PriceAndLocationSection";
import FacilitiesSection from "../components/AddKost/FacilitiesSection";
import SpecificationsSection from "../components/AddKost/SpecificationSection";
import Footer from "../components/Footer";
import HighlightFeatures from "../components/AddKost/HighlightFeatures";
import ImageUpload from "../components/AddKost/ImageUpload";

function AddKost() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const [propertyName, setPropertyName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [kostType, setKostType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [includedFacilities, setIncludedFacilities] = useState([]);
  const [rentalPackages, setRentalPackages] = useState([]);
  const [specifications, setSpecifications] = useState({
    kamar: 0,
    mandi: 0,
    parkiran: 0,
  });

  const handleNameChange = (e) => {
    setPropertyName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setPropertyAddress(e.target.value);
  };

  const handleKostTypeChange = (type) => {
    setKostType(type);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler untuk mengupdate harga
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset formulir?")) {
      setPropertyName("");
      setPropertyAddress("");
      setKostType("");
      setDescription("");
      setPrice("");
      setLocation("");
      setSpecifications({
        kamar: 0,
        mandi: 0,
        parkiran: 0,
      });
      setIncludedFacilities([]);
      setRentalPackages([]);
      alert("Formulir berhasil direset.");
    }
  };

  const handleSave = () => {
    console.log("Data yang disimpan:", {
      propertyName,
      propertyAddress,
      kostType,
      description,
      price,
      location,
      specifications,
      includedFacilities,
      rentalPackages,
    });
    alert("Data berhasil disimpan dan diunggah!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Menampilkan data inputan di console untuk keperluan debugging
    console.log({
      propertyName,
      propertyAddress,
      kostType,
      description,
      price,
      location,
      specifications,
    });

    // Aksi submit data ke backend atau penyimpanan data lainnya dapat ditambahkan di sini.
  };

  const handleIncrement = (key) => {
    setSpecifications({
      ...specifications,
      [key]: specifications[key] + 1,
    });
  };

  const handleDecrement = (key) => {
    setSpecifications({
      ...specifications,
      [key]: specifications[key] > 0 ? specifications[key] - 1 : 0,
    });
  };

  return (
    <div className="bg-white">
      <Navbar />
      
      <div className="max-w-5xl mx-auto bg-white rounded-lg p-6 m-10 mt-2">
          <div className="flex items-center mb-2">
              <button
                onClick={handleBack}
                className="mr-2 text-darkGreen text-xl font-bold"
              >
                <SlArrowLeft size={18} className="font-bold" />
              </button>
              <h1 className="text-2xl text-darkGreen font-bold">Tambahkan Kost Anda</h1>
          </div>
          <hr className="border-gray-300 my-4" />

        {/* Form untuk menginputkan data */}
        <form onSubmit={handleSubmit}>
          <PropertyDetails
            propertyName={propertyName}
            propertyAddress={propertyAddress}
            kostType={kostType}
            onNameChange={handleNameChange}
            onAddressChange={handleAddressChange}
            onKostTypeChange={handleKostTypeChange}
          />
          
          <HighlightFeatures />

          <DescriptionSection
            description={description}
            onDescriptionChange={handleDescriptionChange}
          />

          <PriceAndLocationSection
            price={price}
            location={location}
            onPriceChange={handlePriceChange}
            onLocationChange={handleLocationChange}
          />

          <SpecificationsSection
            specifications={specifications}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            includedFacilities={includedFacilities}
            setIncludedFacilities={setIncludedFacilities}
            rentalPackages={rentalPackages}
            setRentalPackages={setRentalPackages}
          />


          <FacilitiesSection />
          <ImageUpload />
          
           <div className="flex justify-between gap-2">
            <button
              onClick={handleReset}
              type="button"
              className="w-1/2 border border-darkGreen text-darkGreen font-semibold py-3 rounded hover:bg-red-600 hover:text-white"
            >
              Reset & Batalkan
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="w-1/2 bg-darkGreen text-white font-semibold py-3 rounded hover:bg-white hover:text-darkGreen border border-darkGreen"
            >
              Simpan & Upload
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AddKost;
