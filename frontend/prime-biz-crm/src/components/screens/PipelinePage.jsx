import React, { useState } from "react";

const pipelineData = [
  {
    title: "Prospecting",
    value: "4.100.000£",
    deals: [
      { company: "Apple Corporation", deal: "Iphone boxes", value: "1.500.000£" },
      { company: "Chevron Corporation", deal: "IT Equipment", value: "700.000£" },
      { company: "General Motors", deal: "Car parts", value: "800.000£" },
      { company: "AT&T Corporation", deal: "Laptops", value: "1.100.000£" },
    ],
  },
  {
    title: "Contacted",
    value: "4.700.000£",
    deals: [
      { company: "Citi Bank", deal: "IT services", value: "1.800.000£" },
      { company: "FedEx", deal: "Paper boxes", value: "1.400.000£" },
      { company: "Ford Motor", deal: "Seat belts", value: "1.500.000£" },
    ],
  },
  {
    title: "Offer",
    value: "2.100.000£",
    deals: [
      { company: "Samsung Corporation", deal: "Protection glasses", value: "1.200.000£" },
      { company: "IBM", deal: "Laptop boxes", value: "900.000£" },
    ],
  },
  {
    title: "Won",
    value: "1.150.000£",
    deals: [{ company: "HSBC Bank", deal: "Car insurance", value: "1.150.000£" }],
  },
];

const sectionColors = {
  Prospecting: "bg-blue-50 border-blue-400",
  Contacted: "bg-green-50 border-green-400",
  Offer: "bg-yellow-50 border-yellow-400",
  Won: "bg-purple-50 border-purple-400 pointer-events-none",
};

const PipeLinePage = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);

  const openPopup = (deal) => {
    setSelectedDeal(deal);
  };

  const closePopup = () => {
    setSelectedDeal(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-start pt-24 px-4 pb-4">
      {/* Główny kontener */}
      <div className="bg-white shadow-lg p-6 rounded-xl w-full">
        {/* Nagłówek */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pipeline</h2>

        {/* Kolumny pod nagłówkiem */}
        <div className="flex gap-6">
          {pipelineData.map((stage, index) => (
            <div key={index} className={`shadow-md p-4 rounded-xl w-1/4 border ${sectionColors[stage.title]}`}>
              <h2 className="text-lg font-semibold text-gray-700 text-center">{stage.title}</h2>
              <p className="text-gray-500 text-sm mb-4 text-center">Value: {stage.value}</p>
              {stage.deals.map((deal, i) => (
                <div
                  key={i}
                  className={`bg-white p-3 rounded-lg shadow-sm mb-3 border border-gray-200 ${
                    stage.title !== "Won" ? "cursor-pointer hover:bg-gray-200" : ""
                  }`}
                  onClick={() => stage.title !== "Won" && openPopup(deal)}
                >
                  <h3 className="text-gray-800 font-medium">{deal.company}</h3>
                  <p className="text-gray-600 text-sm">Deal name: {deal.deal}</p>
                  <p className="text-gray-500 text-sm">Value: {deal.value}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-700">{selectedDeal.company}</h2>
            <p className="text-gray-600">Deal name: {selectedDeal.deal}</p>
            <p className="text-gray-500">Value: {selectedDeal.value}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipeLinePage;