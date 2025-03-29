import logo from "../assets/PrimeBIZ_logo.png";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setToken, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-6 py-4 h-20 z-50">
      <Link to="/">
        <img src={logo} alt="LOGO PRIMEBIZ CRM" className="w-42 h-42 pt-4" />
      </Link>

      <div className="flex gap-4">
        <Link to="/add_lead" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition hover:opacity-80">
          Add New Lead
        </Link>
        <Link to="/pipeline" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition hover:opacity-80">
          Pipeline
        </Link>
        <Link to="/all_leads" className="border-2 border-black text-black font-bold py-2 px-4 rounded-lg transition hover:bg-gray-200">
          All Leads
        </Link>
        <Link to="/analytics" className="border-2 border-black text-black font-bold py-2 px-4 rounded-lg transition hover:bg-gray-200">
          Analytics
        </Link>
        <Link to="/reminders" className="border-2 border-black text-black font-bold py-2 px-4 rounded-lg transition hover:bg-gray-200">
          Reminders
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;