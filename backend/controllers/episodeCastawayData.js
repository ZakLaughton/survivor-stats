const getEpisodeCastawayData = async (req, res, db, season) => {
  console.log(req.params);
  const { episode } = req.query;
  const formattedEpisode = ("0" + episode).slice(-2);

  let response = {
    tribes: [],
    castaways: []
  }

  response.tribes = await db.select('name', 'tribe_color').from('tribes').where('season', '=', 37)
  const seasonCastaways = await db.select('full_name').from('castaways')
    .innerJoin('season_castaway_mapping', 'castaways.full_name', 'season_castaway_mapping.name')
    .where('season_no', '=', season);
  const currentCastawayTribes = await db.select('castaway', 'field_value').from('updates')
    .where ('start_episode', 'like', `s${season}%`)
    .andWhere(function() {
      this.where('end_episode', '>', `s${season}e${formattedEpisode}`).orWhereNull('end_episode')
    });

  // Make castaway properties clearly titled for JSON data return
  response.castaways = seasonCastaways.map((castaway) => {
    castawayObj = {name: '', tribe: ''}
    castawayObj.name = castaway.full_name;
    const castawayTribeObj = currentCastawayTribes.find((castawayTribe) => {
      return castawayTribe.castaway === castaway.full_name;
    });
    if (castawayTribeObj) {
      castawayObj.tribe = castawayTribeObj.field_value;
    }
      
    return castawayObj;
  })
  res.json(response);
}

module.exports = {
  getEpisodeCastawayData
}