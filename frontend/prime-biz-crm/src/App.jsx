import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Witaj w mojej aplikacji React!</h1>
          <nav>
            <Link to="/">Ekran 1</Link> | 
            <Link to="/screen2"> Ekran 2</Link> | 
            <Link to="/screen3"> Ekran 3</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Screen1 />} />
            <Route path="/screen2" element={<Screen2 />} />
            <Route path="/screen3" element={<Screen3 />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;