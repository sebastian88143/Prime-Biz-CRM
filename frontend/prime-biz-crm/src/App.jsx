import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/screens/MainPage'
import AddLeadPage from './components/screens/AddLeadPage';
import Screen3 from './components/Screen3';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add_lead" element={<AddLeadPage />} />
          <Route path="/screen3" element={<Screen3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
