import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;