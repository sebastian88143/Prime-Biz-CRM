import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import MainPage from './components/screens/MainPage';
import AddLeadPage from './components/screens/AddLeadPage';
import AddPipelinePage from './components/screens/AddPipelinePage';
import EditLeadPage from './components/screens/EditLeadPage';
import PipeLinePage from './components/screens/PipelinePage';
import AllLeadsPage from './components/screens/AllLeadsPage';
import AnalyticsPage from './components/screens/AnalyticsPage';
import RemindersPage from './components/screens/RemindersPage';
import InvoicesPage from './components/screens/InvoicesPage';
import LoginPage from './components/screens/LoginPage';
import RegisterPage from './components/screens/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

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
        {isAuthenticated && <Navbar setToken={setToken} setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<MainPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<LoginPage setToken={setToken} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add_lead" element={<ProtectedRoute element={<AddLeadPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/pipeline" element={<ProtectedRoute element={<PipeLinePage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/all_leads" element={<ProtectedRoute element={<AllLeadsPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/analytics" element={<ProtectedRoute element={<AnalyticsPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/reminders" element={<ProtectedRoute element={<RemindersPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/invoices" element={<ProtectedRoute element={<InvoicesPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/lead/:lead_id" element={<ProtectedRoute element={<EditLeadPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/add_pipeline/:lead_id" element={<ProtectedRoute element={<AddPipelinePage />} isAuthenticated={isAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;