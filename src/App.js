import React from 'react';
import Dropdown from './components/Dropdown';
import './index.css'; 
import DateSelector from './components/DateSelector';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <DateSelector />
    </div>
  );
}

export default App;
