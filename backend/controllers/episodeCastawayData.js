const season = 37;
const episode = 1;


const getEpisodeCastawayData = async (req, res, db) => {
  // const { season, episode } = req.params;
  // res.json(`season ${season}, episode ${episode}`);
  let response = {
    tribes: [],
    castaways: []
  }
  response.tribes = await db.select('name', 'tribe_color').from('tribes').where('season', '=', 37)
  const seasonCastaways = await db.select('full_name', 'updates.value').from('castaways')
    .innerJoin('season_castaway_mapping', 'castaways.full_name', 'season_castaway_mapping.name')
    .innerJoin('updates', 'castaways.full_name', 'updates.castaway')
    .where('season_no', '=', 37)
  
    response.castaways = seasonCastaways.map((castaway) => {
      castawayObj = {name: '', tribe: ''}
      castawayObj.name = castaway.full_name;
      castawayObj.tribe = castaway.value;
      return castawayObj
    })
    res.json(response);
}

module.exports = {
  getEpisodeCastawayData
}