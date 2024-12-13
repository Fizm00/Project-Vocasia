import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchProperty = () => {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataProperty();
  }, []);

  const fetchDataProperty = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/property");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      setProperty(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      throw new Error(
        "Error ffetchDataProperty|Error message :" + error.message
      );
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {property.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default fetchProperty;
