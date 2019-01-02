const season = 37;
const episode = 1;

const getEpisodeCastawayData = (req, res, db) => {
  // const { season, episode } = req.params;
  // res.json(`season ${season}, episode ${episode}`);
  console.log(season, episode);
  db.select('name').from('season_castaway_mapping')
    .where('season_no', '=', 37)
    .then((castaways) => console.log(castaways))
}

module.exports = {
  getEpisodeCastawayData
}