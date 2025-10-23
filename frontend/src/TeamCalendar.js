import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function TeamCalendar() {
  const [requests, setRequests] = useState([]);
  const [datesWithVacations, setDatesWithVacations] = useState([]);

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    const res = await axios.get('https://team-vacation-frontend.onrender.com/api/requests');
    const approved = res.data.filter(r => r.status === 'Approved');
    setRequests(approved);

    const vacationDates = [];
    approved.forEach(r => {
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        vacationDates.push(new Date(d));
      }
    });
    setDatesWithVacations(vacationDates);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      for (let d of datesWithVacations) {
        if (d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate())
          return 'bg-green-300';
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team Vacation Calendar</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
}

