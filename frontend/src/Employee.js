import React, { useState } from 'react';
import axios from 'axios';

export default function Employee() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('https://<YOUR_BACKEND_URL>/api/request', { name, startDate, endDate, reason });
      setMessage('Vacation request submitted!');
      setName(''); setStartDate(''); setEndDate(''); setReason('');
    } catch (err) {
      setMessage('Error submitting request.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Submit Vacation Request</h2>
      <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="block mb-2 border p-1" />
      <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} className="block mb-2 border p-1" />
      <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} className="block mb-2 border p-1" />
      <input placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} className="block mb-2 border p-1" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">Submit</button>
      <p className="mt-2 text-green-600">{message}</p>
    </div>
  );
}
