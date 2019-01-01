const express = require('express');
const app = express();

const episodePlayerData = require('./controllers/episodePlayerData');

app.get('/', (req, res) => {
  res.send('this is working')
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})