const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DATA_FILE = 'requests.json';

function readRequests() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeRequests(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Employee submits vacation request
app.post('/api/request', (req, res) => {
  const requests = readRequests();
  const newRequest = { 
    id: Date.now(), 
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    status: 'Pending'
  };
  requests.push(newRequest);
  writeRequests(requests);
  res.json({ success: true, request: newRequest });
});

// Manager gets all requests
app.get('/api/requests', (req, res) => {
  res.json(readRequests());
});

// Manager approves/rejects
app.post('/api/request/:id/status', (req, res) => {
  const requests = readRequests();
  const request = requests.find(r => r.id == req.params.id);
  if (!request) return res.status(404).json({ error: 'Request not found' });
  request.status = req.body.status;
  writeRequests(requests);
  res.json({ success: true, request });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
