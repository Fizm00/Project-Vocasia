import axios from "axios";

const fetchProperty = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/properties");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    throw error;
  }
};

export default fetchProperty;
