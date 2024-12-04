import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ locations }) => {
  const defaultCenter = {
    lat: -6.200000, // Lat long default, bisa diubah sesuai lokasi yang lebih umum
    lng: 106.816666
  };

  return (
    <div style={{ position: 'fixed', top: '70px', right: '0', height: '100vh', width: '35%', zIndex: 999 }}>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={defaultCenter}
          zoom={10}
        >
          {locations.map((kost, index) => {
            const [latitude, longitude] = kost.lokasi.split(',').map(coord => parseFloat(coord.trim()));
            return (
              <Marker
                key={index}
                position={{ lat: latitude, lng: longitude }}
                label={kost.namaKost}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
