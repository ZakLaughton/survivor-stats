const getEpisodeCastawayData = async (req, res, db) => {

  let response = {
    season: null,
    tribes: [],
    episodes: []
  }

  const season = req.query.season;

  response.tribes = await db.select('name', 'tribe_color').from('tribes').where('season', '=', Number(season)).catch(console.log);
  const seasonEpisodes = await db.select('*').from('episodes').where('id', 'like', `s${season}e%`).catch(console.log);
  const seasonCastaways = await db.select('*').from('season_castaway_mapping').where('season_no', '=', Number(season)).catch(console.log);
  const seasonTribeChanges = await db.select('castaway', 'field_value', 'start_episode', 'boot_order').from('updates')
    .where('start_episode', 'like', `s${season}%`).where('field', '=', 'tribe');

  const castawayDataByEpisode = seasonEpisodes
    .map((episode) => {
      const episodeObj = {
        id: null,
        castaways: []
      }
      episodeObj.id = `s${season}e${episode.id.slice(-2)}`;
      episodeObj.castaways = seasonCastaways
        .map((castaway) => ({'name': castaway.name, 'currentBoot': false, 'bootOrder': null}))
        .sort((a, b) => (a.name < b.name ? -1 : 1))

      // Populate each tribe for the current episode
      const castawaysWithTribes = episodeObj.castaways.map((castaway) => {
        const updatedCastaway = castaway;
        const currentChanges = seasonTribeChanges
          .filter(change => change.start_episode <= episodeObj.id)  // filter later episode data
          .filter(currentChange => currentChange.castaway === castaway.name)
        
        // find the episode(s) with the highest change.start_episode
        const latestChangeEpisode = currentChanges
          .reduce((prev, current) => (prev.start_episode > current.start_episode) ? prev : current)
          .start_episode

        // Get changes from the most recent episode
        const latestChanges = currentChanges.filter((change) => change.start_episode === latestChangeEpisode);
        // Get previous changes for former tribes
        const previousChanges = currentChanges
          .filter((change) => change.start_episode != latestChangeEpisode)
          .sort((a, b) => (a.start_episode < b.start_episode ? -1 : 1));
        // To retrieve last tribe for booted contestants
        const latestNonOutChange = currentChanges
          .filter((change) => change.field_value != 'out')
          .reduce((prev, current) => (prev.start_episode > current.start_episode) ? prev : current);
        updatedCastaway.formerTribes = previousChanges.map(change => change.field_value)
        
        // Handle booted contestants
        if (latestChanges.some((change) => change.field_value === 'out')) {
          // Handle contestants booted in THIS episode
          if (latestChangeEpisode === episodeObj.id) {
            updatedCastaway.currentBoot = true;
            updatedCastaway.tribe = latestNonOutChange.field_value;
          } else {
            updatedCastaway.tribe = 'out'
          }
          updatedCastaway.bootOrder = latestChanges.find((change) => change.field_value === 'out').boot_order;
        } else {
          updatedCastaway.tribe = latestChanges[0].field_value;
        }

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