import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/screens/MainPage'
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/screen2" element={<Screen2 />} />
          <Route path="/screen3" element={<Screen3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
