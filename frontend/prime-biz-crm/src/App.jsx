import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/screens/MainPage'
import AddLeadPage from './components/screens/AddLeadPage';
import PipeLinePage from './components/screens/PipelinePage';
import AllLeadsPage from './components/screens/AllLeadsPage'
import RemindersPage from './components/screens/RemindersPage';
import InvoicesPage from './components/screens/InvoicesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add_lead" element={<AddLeadPage />} />
          <Route path="/pipeline" element={<PipeLinePage />}></Route>
          <Route path="/all_leads" element={<AllLeadsPage />} />
          <Route path="/reminders" element={<RemindersPage/>} />
          <Route path="/invoices" element={<InvoicesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
