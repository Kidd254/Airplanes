import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="home" element={<MainPage />} />
    </Routes>
  );
}

export default App;
