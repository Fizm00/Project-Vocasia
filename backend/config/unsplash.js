const axios = require("axios");
const createApi = require("unsplash-js");
require("dotenv").config();

// const unsplash = createApi({
//   accessKey: process.env.UNSPLASH_ACCESS_KEY,
// });
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getRandomPropertyImage = async () => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query: "property", // Kata kunci pencarian gambar (misalnya "property")
        client_id: process.env.UNSPLASH_ACCESS_KEY, // Access Key Unsplash
        count: 2, // Ambil 1 gambar
      },
    });
    console.log("getRandomPropertyImage|response:" + response);

    // Ambil URL gambar
    const imageUrl = response.data[0]?.urls?.regular; // Mengambil URL gambar dengan resolusi reguler
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return null; // Kembalikan null jika ada error
  }
};

module.exports = getRandomPropertyImage;
