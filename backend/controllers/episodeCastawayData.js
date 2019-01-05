const getEpisodeCastawayData = async (req, res, db, season) => {
  const { episode } = req.query;
  const formattedEpisode = ("0" + episode).slice(-2);

  let response = {
    tribes: [],
    seasonTribeChanges: []
  }

  response.tribes = await db.select('name', 'tribe_color').from('tribes').where('season', '=', 37)
  const seasonCastaways = await db.select('full_name').from('castaways')
    .innerJoin('season_castaway_mapping', 'castaways.full_name', 'season_castaway_mapping.name')
    .where('season_no', '=', season);
  const seasonTribeChanges = await db.select('castaway', 'field_value', 'start_episode').from('updates')
    .where('start_episode', 'like', 's37%');
    

  // Make castaway properties clearly titled for JSON data return
  response.seasonTribeChanges = seasonTribeChanges;
  res.json(response);
}

module.exports = {
  getEpisodeCastawayData
}