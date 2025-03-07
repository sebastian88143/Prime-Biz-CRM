import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setToken, setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGOPRIMEBIZ CRM</div>
      <div className="navbar-links">
        <Link to="/add_lead" className="primary-link">Add New Lead</Link>
        <Link to="/pipeline" className="primary-link">Pipeline</Link>
        <Link to="/all_leads" className="secondary-link">All Leads</Link>
        <Link to="/analytics" className="secondary-link">Analytics</Link>
        <Link to="/reminders" className="secondary-link">Reminders</Link>
        <Link to="/invoices" className="secondary-link">Invoices</Link>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;