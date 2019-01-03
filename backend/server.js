require('dotenv').load();

const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');

app.use(cors());

const castawayData = require('./controllers/episodeCastawayData');


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/', (req, res) => {castawayData.getEpisodeCastawayData(req, res, db)})
// app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})