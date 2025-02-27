import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/screens/MainPage';
import AddLeadPage from './components/screens/AddLeadPage';
import PipeLinePage from './components/screens/PipelinePage';
import AllLeadsPage from './components/screens/AllLeadsPage';
import AnalyticsPage from './components/screens/AnalyticsPage';
import RemindersPage from './components/screens/RemindersPage';
import InvoicesPage from './components/screens/InvoicesPage';
import LoginPage from './components/screens/LoginPage';
import RegisterPage from './components/screens/RegisterPage'
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/check-auth/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(res.status === 200);
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        setToken(null);
      }
    };

    checkAuth();
  }, [token]);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add_lead" element={isAuthenticated ? <AddLeadPage /> : <Navigate to="/login" />} />
          <Route path="/pipeline" element={isAuthenticated ? <PipeLinePage /> : <Navigate to="/login" />} />
          <Route path="/all_leads" element={isAuthenticated ? <AllLeadsPage /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/login" />} />
          <Route path="/reminders" element={isAuthenticated ? <RemindersPage /> : <Navigate to="/login" />} />
          <Route path="/invoices" element={isAuthenticated ? <InvoicesPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;