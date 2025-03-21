import CurrentLeadPopup from '../CurrentLeadPopup';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    size: "None",
    industry: "None",
    topLeadsOnly: false,
  });

  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.get('http://localhost:8000/api/all_leads/', {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setLeads(response.data.leads);
    } catch (error) {
      console.error("Error fetching leads:", error.response || error.message);
    }
  };

  const handleCardClick = (leadName) => {
    setSelectedLead(leadName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              placeholder="Search by company name"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="bg-white w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex mb-6 space-x-6 w-full">
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              className="bg-white border p-2 rounded w-full"
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
            >
              <option value="None">None</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Big">Big</option>
            </select>
          </div>
          <div className="w-3/4">
            <label className="block text-sm font-medium mb-2">Industry</label>
            <select
              className="bg-white border p-2 rounded w-full"
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
            >
              <option value="None">None</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 justify-center w-1/4 pt-6">
            <input
              type="checkbox"
              className="form-checkbox"
              value={filters.topLeadsOnly}
              onChange={(e) => setFilters({ ...filters, topLeadsOnly: e.target.checked })}
            />
            <span className="text-lg font-semibold">Top Leads Only</span>
          </div>
        </div>

        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-lg shadow-md flex justify-between items-center bg-white hover:bg-gray-200 transition duration-300 cursor-pointer"
              onClick={() => handleCardClick(lead.company_name)}
            >
              <div>
                <h2 className="text-xl font-semibold">{lead.company_name}</h2>
                <p className="text-sm">{lead.industry}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString('en-GB')}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(lead.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <CurrentLeadPopup isOpen={isModalOpen} selectedLead={selectedLead} onClose={closeModal} />
      </div>
    </div>
  );
};

export default AddLeadsPage;