import CurrentLeadPopup from "../CurrentLeadPopup";

import React, { useState, useEffect } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};

const formatDateTime = (dateString) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
};

const getGreeting = () => {
  const hours = new Date().getHours();
  return hours < 12
    ? "Good Morning"
    : hours < 18
      ? "Good Afternoon"
      : "Good Evening";
};

const MainPage = () => {
  const [leads, setLeads] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const userRes = await axios.get("http://localhost:8000/api/user_info/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data.user);

      const [leadsRes, remindersRes] = await Promise.all([
        axios.get("http://localhost:8000/api/top_leads/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/reminders/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setLeads(leadsRes.data.leads);
      setReminders(remindersRes.data.reminders);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleCardClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col pt-24 bg-blue-50">
      <div className="flex justify-start px-6">
        <div className="text-xl font-semibold">
          {getGreeting()}, {user ? user.username : "Loading..."}!
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Sales Performance Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
          <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
          <div className="bg-white rounded-lg h-72 flex items-center justify-center">
            <p className="text-gray-400">[Chart Placeholder]</p>
          </div>
        </div>

        {/* Top Leads Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Top Leads</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <ul>
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  onClick={() => handleCardClick(lead)}
                  className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50 active:scale-95 p-4 rounded-lg shadow mb-2"
                >
                  <p className="font-semibold text-base">{lead.company_name}</p>
                  <p className="text-sm text-gray-400">{lead.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Reminders Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
          <h2 className="text-lg font-semibold mb-4">Reminders</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <ul>
              {reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  onClick={() => handleClick(reminder.title)}
                  className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50 active:scale-95 p-4 rounded-lg shadow mb-2"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <p className="font-semibold text-base">{reminder.title}</p>
                      <p className="text-sm text-gray-400">{formatDateTime(reminder.reminder_date)}</p>
                    </div>
                    <p className="text-xs text-gray-500 self-center">{formatDate(reminder.created_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Empty Space to Create Gap */}
        <div className="flex-grow w-1/3"></div>

        <CurrentLeadPopup isOpen={isModalOpen} selectedLead={selectedLead} onClose={closeModal} onLeadDeleted={fetchData} />
      </div>
    </div>
  );
};

export default MainPage;