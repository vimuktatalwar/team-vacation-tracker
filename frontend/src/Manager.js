import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCalendar from './TeamCalendar';

export default function Manager() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get('https://<YOUR_BACKEND_URL>/api/requests');
    setRequests(res.data);
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id, status) => {
    await axios.post(`https://<YOUR_BACKEND_URL>/api/request/${id}/status`, { status });
    fetchRequests();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Approve / Reject Requests</h2>
      {requests.map(r => (
        <div key={r.id} className="border p-2 mb-2">
          <p><strong>{r.name}</strong> | {r.startDate} → {r.endDate} | {r.reason}</p>
          <p>Status: <span className="font-bold">{r.status}</span></p>
          {r.status === 'Pending' && (
            <div className="mt-2">
              <button onClick={() => updateStatus(r.id, 'Approved')} className="mr-2 bg-green-500 text-white px-2 py-1">Approve</button>
              <button onClick={() => updateStatus(r.id, 'Rejected')} className="bg-red-500 text-white px-2 py-1">Reject</button>
            </div>
          )}
        </div>
      ))}
      <TeamCalendar />
    </div>
  );
}
