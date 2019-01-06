const getEpisodeCastawayData = async (req, res, db, season = 37) => {

  let response = {
    season,
    tribes: [],
    episodes: []
  }

  response.tribes = await db.select('name', 'tribe_color').from('tribes').where('season', '=', 37)
  const seasonEpisodes = await db.select('*').from('episodes').where('id', 'like', `s${season}e%`);
  const seasonCastaways = await db.select('*').from('season_castaway_mapping').where('season_no', '=', '37');
  const seasonTribeChanges = await db.select('castaway', 'field_value', 'start_episode').from('updates')
    .where('start_episode', 'like', 's37%');
  
  // Data from seasonTribeChanges to fill out data for each episode
  // [{id: sXXeXX,
  //   castaways: [
  //     {name: <name>,
  //      tribe: <tribe>}
  //   ]
  // }, ...]

  // Get all season episodes
  // Get all castaways

  // For each episode
  //   for each castaway
  //     get the current tribe

  castawayDataByEpisode = seasonEpisodes.map((episode) => {
    episodeObj = {
      id: null,
      castaways: []
    }
    episodeObj.id = Number(episode.id.slice(-2));
    episodeObj.castaways = seasonCastaways.map((castaway) => {
      return {'name': castaway.name}
    })
  })
  console.log(JSON.stringify(episodeObj))

  // Make castaway properties clearly titled for JSON data return
  response.seasonTribeChanges = seasonTribeChanges;
  res.json(response);
}

module.exports = {
  getEpisodeCastawayData
}