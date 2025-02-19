import React, { useState } from 'react';

const AddLeadsPage = () => {
  // Stan do przechowywania wybranej karty oraz stanu modalu
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funkcja obsługująca kliknięcie w kartę
  const handleCardClick = (leadName) => {
    setSelectedLead(leadName);  // Ustawiamy nazwę wybranego leada
    setIsModalOpen(true);  // Otwieramy popup
  };

  // Funkcja zamykająca modal
  const closeModal = () => {
    setIsModalOpen(false);  // Zamykamy popup
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-8xl">
        <h1 className="text-2xl font-bold pb-8">All Leads</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Company Name</h2>
          <div className="flex space-x-6">
            <input
              type="text"
              placeholder="Value"
              className="bg-white w-3/4 border p-2 rounded"
            />
            <button className="w-1/4 bg-blue-500 text-white p-2 rounded">Search</button>
          </div>
        </div>

        <div className="flex mb-6 space-x-6 w-full">
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-2">Size</label>
            <select className="bg-white border p-2 rounded w-full">
              <option>None</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Big</option>
            </select>
          </div>
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-2">Industry</label>
            <select className="bg-white border p-2 rounded w-full">
              <option>None</option>
              <option>Manufacturing</option>
              <option>Retail</option>
              <option>Services</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 justify-center w-1/4 pt-6">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-lg font-semibold">Top Leads Only</span>
          </div>
        </div>

        <div className="space-y-4">
          {["TJX", "Costco", "The Home Depot", "Albertsons", "Walmart"].map((leadName, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-md flex justify-between items-center bg-white hover:bg-gray-200 transition duration-300 cursor-pointer"
              onClick={() => handleCardClick(leadName)}
            >
              <div>
                <h2 className="text-xl font-semibold">{leadName}</h2>
                <p className="text-sm">Retail</p>
              </div>
              <p className="text-sm text-gray-500">Added: 25/08/2024</p>
            </div>
          ))}
        </div>

        {/* Modal - popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Selected Lead: {selectedLead}</h2>
              <p className="text-sm text-gray-500 mb-4">Here are the details of the selected lead.</p>
              <button
                onClick={closeModal} 
                className="w-full bg-blue-500 text-white py-2 rounded"
                >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddLeadsPage;