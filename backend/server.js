const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('this is working')
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/s:season/e:episode', (req, res) => {
  const { season, episode } = req.params;
  res.json(`season ${season}, episode ${episode}`);
})
/*
/sXX/eXX/ --> return players/status

*/