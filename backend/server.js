const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const episodePlayerData = require('../frontend/src/database/players');

app.get('/', (req, res) => {
  console.log(episodePlayerData);
  res.status('200').json(episodePlayerData);
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})