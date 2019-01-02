const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const episodePlayerData = require('./controllers/episodePlayerData');

app.get('/', (req, res) => {
  res.status('200').json('this is working')
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})