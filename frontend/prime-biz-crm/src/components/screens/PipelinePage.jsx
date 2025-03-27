import CurrentPipelinePopup from "../CurrentPipelinePopup";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const sectionColors = {
  Prospecting: "bg-blue-50 border-blue-400",
  Negotiation: "bg-green-50 border-green-400",
  "Proposal Sent": "bg-yellow-50 border-yellow-400",
  Won: "bg-purple-50 border-purple-400",
};

const PipeLinePage = () => {
  const [pipelineData, setPipelineData] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/pipelines/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pipeline data");
      }

      const data = await response.json();

      if (!data.pipelines) {
        throw new Error("Invalid API response: missing 'pipelines' field");
      }

      const groupedData = data.pipelines.reduce((acc, deal) => {
        const { id, stage, company_name, deal_name, expected_value } = deal;
        if (!acc[stage]) {
          acc[stage] = {
            title: stage,
            value: 0,
            deals: [],
          };
        }
        const formattedValue = parseFloat(expected_value).toLocaleString("en-GB");
        acc[stage].value += parseFloat(expected_value);
        acc[stage].deals.push({
          id,
          stage: deal.stage,
          company: company_name,
          deal: deal_name,
          value: `${formattedValue}£`,
          lead_id: deal.lead_id
        });
        return acc;
      }, {});

      const stageOrder = ["Prospecting", "Negotiation", "Proposal Sent", "Won"];
      const sortedData = Object.values(groupedData)
        .map((stage) => ({
          ...stage,
          value: stage.value.toLocaleString("en-GB"),
        }))
        .sort((a, b) => stageOrder.indexOf(a.title) - stageOrder.indexOf(b.title));

      setPipelineData(sortedData);
    } catch (error) {
      console.error("Error fetching pipeline data:", error);
    }
  };

  const openPopup = (deal) => {
    setSelectedDeal(deal);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedDeal(null);
    setIsPopupOpen(false);
    fetchPipelineData();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-start pt-24 px-4 pb-4">
      <div className="bg-white shadow-lg p-6 rounded-xl w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pipeline</h2>

        <div className="flex gap-6 items-center">
          {pipelineData.map((stage, index) => (
            <React.Fragment key={index}>
              <div className={`shadow-md p-4 rounded-xl w-1/4 border ${sectionColors[stage.title]}`}>
                <h2 className="text-lg font-semibold text-gray-700 text-center">{stage.title}</h2>
                <p className="text-gray-500 text-sm mb-4 text-center">Value: {stage.value}£</p>
                {stage.deals.map((deal, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-lg shadow-sm mb-3 border border-gray-200 cursor-pointer hover:bg-gray-200"
                    onClick={() => openPopup(deal)}
                  >
                    <h3 className="text-gray-800 font-medium">{deal.company}</h3>
                    <p className="text-gray-600 text-sm">Deal name: {deal.deal}</p>
                    <p className="text-gray-500 text-sm">Value: {deal.value}</p>
                  </div>
                ))}
              </div>

              {index < pipelineData.length - 1 && (
                <ArrowRight size={40} strokeWidth={6} className="text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <CurrentPipelinePopup isOpen={isPopupOpen} selectedDeal={selectedDeal} onClose={closePopup} onDealUpdated={fetchPipelineData} />
    </div>
  );
};

export default PipeLinePage;