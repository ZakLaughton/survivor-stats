const getEpisodeCastawayData = async (req, res, db, season) => {
  console.log(req.query);
  console.log(req.params);
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

  console.log('cct: ', seasonTribeChanges);

      // WHERE (castaway,start_episode) IN 
      // ( SELECT castaway, MAX(start_episode)
      //   FROM 
      // where start_episode like 's37%'
      //    and where start_episode <= 's37e01'
      //   GROUP BY castaway
      // )
      

    // function() {
    //   this.where('end_episode', '>', `s${season}e${formattedEpisode}`).orWhereNull('end_episode')}
    

  // Make castaway properties clearly titled for JSON data return
  response.seasonTribeChanges = seasonTribeChanges;
  res.json(response);
}

module.exports = {
  getEpisodeCastawayData
}