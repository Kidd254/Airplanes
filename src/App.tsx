// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
