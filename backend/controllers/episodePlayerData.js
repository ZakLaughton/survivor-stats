const getEpisodePlayerData = (req, res) => {
  const { season, episode } = req.params;
  res.json(`season ${season}, episode ${episode}`);
}

module.exports = {
  getEpisodePlayerData
}