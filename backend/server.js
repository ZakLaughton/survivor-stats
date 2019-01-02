require('dotenv').load();

const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');

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

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
  db.select('*').from('castaways')
    .then((castaway) => console.log(castaway))
})

app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})