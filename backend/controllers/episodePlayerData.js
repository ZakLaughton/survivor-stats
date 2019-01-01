const playerData = require('../../frontend/src/database/players');

const getEpisodePlayerData = (req, res) => {
  const { season, episode } = req.params;
  console.log('players', playerData)
  // fs.readFile('../../frontend/src/database/players.json', 'utf8', function (err, data) {
  //   if (err) throw err;
  //   obj = JSON.parse(data);
  //   res.json(obj);
  // });
  res.json(`season ${season}, episode ${episode}`);
}

module.exports = {
  getEpisodePlayerData
}