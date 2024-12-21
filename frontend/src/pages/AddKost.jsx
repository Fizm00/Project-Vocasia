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
// import HighlightFeatures from "../components/AddKost/HighlightFeatures";
import ImageUpload from "../components/AddKost/ImageUpload";
import { addProperty } from "../api/property";

function AddKost() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  console.log(user_id)
  const handleBack = () => {
    navigate("/dashboard");
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender_type, setGenderType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [facility, setFacility] = useState([]);
  const [images , setImages] = useState([]);
  const [property_type, setPropertyType] = useState("");
  const [stock, setStock] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); // Tambahkan state ini

  // const [rentalPackages, setRentalPackages] = useState([]);
  // const [specifications, setSpecifications] = useState({
  //   kamar: 0,
  //   mandi: 0,
  //   parkiran: 0,
  // });

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const handleGenderTypeChange = (type) => {
    setGenderType(type);
  };
  console.log(name)
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value); 
  };

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset formulir?")) {
      setName("");
      setAddress("");
      setGenderType("");
      setDescription("");
      setPrice("");
      setCity("");
      // setSpecifications({
      //   kamar: 0,
      //   mandi: 0,
      //   parkiran: 0,
      // });
      setFacility([]);
      // setRentalPackages([]);
      alert("Formulir berhasil direset.");
    }
  };

  const handleSave = () => {
    console.log("Data yang disimpan:", {
      name,
      address,
      gender_type,
      description,
      price,
      city,
      facility,
      images,
    });
    alert("Data berhasil disimpan dan diunggah!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Cegah pengiriman berulang
    setIsSubmitting(true);

    console.log("Data yang disimpan:", {
      name,
      address,
      gender_type,
      description,
      price,
      city,
      facility,
      images,
    });
    // Menyiapkan FormData
      const formData = new FormData();

      // Menambahkan data ke FormData
      formData.append("user_id", user_id);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("gender_type", gender_type);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("city", city);
      formData.append("property_type", property_type);
      formData.append("stock", stock);
    
      // Tambahkan fasilitas sebagai string
      formData.append("facility", facility.join(","));
    
      // Menambahkan file gambar
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      console.log(formData)

      try {
        const response = await addProperty(formData);
        console.log("Property added successfully:", response.data);
    
        // Reset state jika berhasil
        setName("");
        setAddress("");
        setGenderType("");
        setDescription("");
        setPrice("");
        setCity("");
        setFacility([]);
        setImages([]);
        setPropertyType("");
        setStock(1);
    
        alert("Property berhasil ditambahkan!");
      } catch (error) {
        console.error("Error adding property:", error.response?.message || error.message);
        // alert("Terjadi kesalahan, silakan coba lagi.");
      } finally {
        setIsSubmitting(false); // Kembalikan status submit
      }
    };
    

    //   try {
    //     const response = await addProperty(formData);
    //     //   headers: {
    //     //     "Content-Type": "multipart/form-data",
    //     //   },
    //     // });
    //     // console.log("Property added successfully:", response.data);
      
    //   } catch (error) {
    //     console.error("Error adding property:", error.response.message);
    //   }
    // };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Menampilkan data inputan di console untuk keperluan debugging
  //   console.log({
  //     name,
  //     address,
  //     gender_type,
  //     description,
  //     price,
  //     city,
  //     facility
  //   });

  //   // Aksi submit data ke backend atau penyimpanan data lainnya dapat ditambahkan di sini.
  // };

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
            propertyName={name}
            propertyAddress={address}
            gender_type={gender_type}
            onNameChange={handleNameChange}
            onAddressChange={handleAddressChange}
            onKostTypeChange={handleGenderTypeChange}
          />

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tipe Properti</label>
            <select
              value={property_type}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Pilih Tipe Properti</option>
              <option value="Apartemen">Apartemen</option>
              <option value="Kost">Kost</option>
              <option value="Rumah">Rumah</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Jumlah Stok</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              min="1"
            />
          </div>

          
          {/* <HighlightFeatures /> */}

          <DescriptionSection
            description={description}
            onDescriptionChange={handleDescriptionChange}
          />

          <PriceAndLocationSection
            price={price}
            location={city}
            onPriceChange={handlePriceChange}
            onLocationChange={handleCityChange}
          />

          {/* <SpecificationsSection
            specifications={specifications}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            includedFacilities={includedFacilities}
            setIncludedFacilities={setIncludedFacilities}
            rentalPackages={rentalPackages}
            setRentalPackages={setRentalPackages}
          /> */}


          <FacilitiesSection onChange={setFacility}/>
          <ImageUpload onChange={setImages}/>
          
           <div className="flex justify-between gap-2">
            <button
              onClick={handleReset}
              type="submit"
              className="w-1/2 border border-darkGreen text-darkGreen font-semibold py-3 rounded hover:bg-red-600 hover:text-white"
            >
              Reset & Batalkan
            </button>
            <button
              onClick={handleSave}
              type="submit"
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