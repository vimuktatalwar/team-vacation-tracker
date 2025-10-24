import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Employee from './Employee';
import Manager from './Manager';

function App() {
  return (
    <Router>
      <div className="p-6 font-sans">
        <h1 className="text-3xl font-bold mb-4">Team Vacation Tracker</h1>
        <nav className="mb-6">
          <Link className="mr-4 text-blue-500" to="/employee">Employee</Link>
    <div style="padding: 20px;">...</div>
          <Link className="text-blue-500" to="/manager">Manager</Link>
        </nav>
        <Routes>
          <Route path="/employee" element={<Employee />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
