import React, { useState } from "react";
import Layout from "../components/Layout";

// Generate 50 properties
const allProperties = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Kost ${['Damai', 'Sejahtera', 'Bahagia', 'Harmoni', 'Indah'][i % 5]} ${['Permai', 'Asri', 'Tentram', 'Makmur', 'Sentosa'][Math.floor(i / 5) % 5]}`,
  type: i % 2 === 0 ? "Tipe Ekonomis" : "Tipe Premium",
  image: `/kost${(i % 12) + 1}.jpg`
}));

const ITEMS_PER_PAGE = 12;

export default function Properties() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProperty = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProperty = indexOfLastProperty - ITEMS_PER_PAGE;
  const currentProperties = allProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const totalPages = Math.ceil(allProperties.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Listed Properties</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProperties.map((property) => (
            <div key={property.id} className="overflow-hidden bg-white rounded-lg shadow">
              <img
                src={property.image}
                alt={property.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold truncate">{property.name}</h3>
                <p className="mb-4 text-sm text-gray-500">{property.type}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                    Remove
                  </button>
                  <button className="flex-1 px-4 py-2 text-white rounded-md bg-darkGreen hover:opacity-90">
                    Modify
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="flex items-center justify-center w-10 h-10 bg-white border rounded-md text-darkGreen border-darkGreen"
            >
              &lt;
            </button>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => paginate(pageNumber)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${pageNumber === currentPage
                    ? 'bg-darkGreen text-white'
                    : 'bg-white text-darkGreen border border-darkGreen'
                    }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              (pageNumber === currentPage - 2 && currentPage > 3) ||
              (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return <span key={index} className="px-2">...</span>;
            }
            return null;
          })}

          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="flex items-center justify-center w-10 h-10 bg-white border rounded-md text-darkGreen border-darkGreen"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}