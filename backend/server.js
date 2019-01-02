const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const episodePlayerData = require('./database/castaways');
const tribeData=require('./database/tribes')
const response = {
  castaways: episodePlayerData,
  tribes: tribeData}
app.get('/', (req, res) => {
  console.log('res: ', response);
  res.status('200').json(response);
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})