require('dotenv').load();

const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');
const PORT = process.env.PORT || 5000;

app.use(cors());

const seasonData = require('./controllers/seasonData');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  seasonData.getSeasonData(req, res, db);
});

app.get('/seasons', async (req, res) => {
  const seasons = await db.select('*').from('seasons');
  res.json(seasons);
});
// app.get('/s:season/e:episode', (req, res) => {episodePlayerData.getEpisodePlayerData(req, res)})
