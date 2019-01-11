const getEpisodeCastawayData = async (req, res, db, season = 37) => {

  let response = {
    season,
    tribes: [],
    episodes: []
  }

  response.tribes = await db.select('name', 'tribe_color').from('tribes').where('season', '=', 37)
  const seasonEpisodes = await db.select('*').from('episodes').where('id', 'like', `s${season}e%`);
  const seasonCastaways = await db.select('*').from('season_castaway_mapping').where('season_no', '=', '37');
  const seasonTribeChanges = await db.select('castaway', 'field_value', 'start_episode', 'boot_order').from('updates')
    .where('start_episode', 'like', `s${season}%`);

  const castawayDataByEpisode = seasonEpisodes
    .map((episode) => {
      const episodeObj = {
        id: null,
        castaways: []
      }
      episodeObj.id = `s${season}e${episode.id.slice(-2)}`;
      episodeObj.castaways = seasonCastaways
        .map((castaway) => ({'name': castaway.name, 'bootOrder': null}))
        .sort(function(a, b) {                // alphabetize
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {return -1;}
          if (nameA > nameB) {return 1;}
          return 0;
        });

      // Populate each tribe for the current episode
      const castawaysWithTribes = episodeObj.castaways.map((castaway) => {
        const updatedCastaway = castaway;
        const currentTribe = seasonTribeChanges
          .filter(change => change.start_episode <= episodeObj.id)  // filter later episode data
          .filter(currentChange => currentChange.castaway === castaway.name)
          .reduce((prev, current) => (prev.start_episode > current.start_episode) ? prev : current)
        
        if (currentTribe.boot_order) {updatedCastaway.bootOrder = currentTribe.boot_order}
        updatedCastaway.tribe = currentTribe.field_value;
        return updatedCastaway;
      });

      episodeObj.castaways = castawaysWithTribes;

      

      return episodeObj;
  })

  response.episodes = castawayDataByEpisode
  res.json(response);
}

module.exports = {
  getEpisodeCastawayData
}