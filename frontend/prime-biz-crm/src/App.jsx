import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './components/MainLayout';
import MainPage from './components/screens/MainPage';
import AddLeadPage from './components/screens/AddLeadPage';
import AddPipelinePage from './components/screens/AddPipelinePage';
import EditLeadPage from './components/screens/EditLeadPage';
import EditPipelinePage from './components/screens/EditPipelinePage';
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
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<MainPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/add_lead"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<AddLeadPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/pipeline"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<PipeLinePage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/all_leads"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<AllLeadsPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<AnalyticsPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/reminders"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<RemindersPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/invoices/:pipeline_id"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<InvoicesPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/lead/:lead_id"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<EditLeadPage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/add_pipeline/:lead_id"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<AddPipelinePage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
          <Route
            path="/pipeline/:pipeline_id"
            element={
              <MainLayout setToken={setToken} setIsAuthenticated={setIsAuthenticated}>
                <ProtectedRoute element={<EditPipelinePage />} isAuthenticated={isAuthenticated} />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;