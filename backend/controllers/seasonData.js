const getSeasonData = async (req, res, db) => {
  let response = {
    season: req.query.season,
    tribes: [],
    episodes: [],
    preseasonStats: []
  };

  const season = req.query.season;

  response.tribes = await db
    .select('name', 'tribe_color')
    .from('tribes')
    .where('season', '=', Number(season))
    .catch(console.log);
  const seasonEpisodes = await db
    .select('*')
    .from('episodes')
    .where('id', 'like', `s${season}e%`)
    .catch(console.log);
  const seasonCastaways = await db
    .select('*')
    .from('season_castaway_mapping')
    .where('season_no', '=', Number(season))
    .join('castaways', 'castaways.full_name', 'season_castaway_mapping.name')
    .catch(console.log);
  const seasonTribeChanges = await db
    .select('castaway', 'field_value', 'start_episode', 'boot_order', 'details')
    .from('updates')
    .where('start_episode', 'like', `s${season}%`)
    .where('field', '=', 'tribe');
  const seasonAdvantageChanges = await db
    .select(
      'castaway',
      'field_value',
      'start_episode',
      'end_episode',
      'details'
    )
    .from('updates')
    .where('start_episode', 'like', `s${season}%`)
    .where('field', '=', 'advantage');
  const castawayProfiles = await db('castaway_season_profiles').where(
    'season',
    '=',
    Number(season)
  );

  const preseasonStats = await db
    .select('stat', 'value', 'line')
    .from('preseason_stats')
    .where('season', '=', Number(season))
    .andWhere('display', '=', 'true');

  const tribalCouncils = await db('tribal_councils').where(
    'episode',
    'like',
    `s${season}%`
  );

  const tribalPlays = await db('tribal_plays')
    .join(
      'tribal_councils',
      'tribal_plays.tribal_council',
      '=',
      'tribal_councils.id'
    )
    .where('tribal_councils.episode', 'like', `s${season}%`);

  const castawayDataByEpisode = seasonEpisodes.map(episode => {
    // set up empty skeleton for each episode object
    const episodeObj = {
      id: null,
      castaways: [],
      tribalCouncils: []
    };

    episodeObj.active = episode.active;
    episodeObj.id = `s${season}e${episode.id.slice(-2)}`;
    episodeObj.castaways = seasonCastaways
      .map(castaway => ({
        name: castaway.name,
        nickname: castaway.nickname,
        currentBoot: false,
        juryMember: false,
        bootOrder: null
      }))
      .sort((a, b) => (a.name < b.name ? -1 : 1));

    // Populate tribe data for each castaway
    episodeObj.castaways = episodeObj.castaways.map(castaway => {
      const updatedCastaway = castaway;
      const currentChanges = seasonTribeChanges
        .filter(change => change.start_episode <= episodeObj.id) // filter later episode data
        .filter(currentChange => currentChange.castaway === castaway.name);

      // find the episode(s) with the highest change.start_episode
      const latestChangeEpisode = currentChanges.reduce((prev, current) =>
        prev.start_episode > current.start_episode ? prev : current
      ).start_episode;

      // Get changes from the most recent episode
      const latestChanges = currentChanges.filter(
        change => change.start_episode === latestChangeEpisode
      );
      // Get previous changes for former tribes
      const previousChanges = currentChanges
        .filter(change => change.start_episode != latestChangeEpisode)
        .sort((a, b) => (a.start_episode < b.start_episode ? -1 : 1));
      // To retrieve last tribe for booted contestants
      const latestNonOutChange = currentChanges
        .filter(change => change.field_value != 'out')
        .reduce((prev, current) =>
          prev.start_episode > current.start_episode ? prev : current
        );
      updatedCastaway.formerTribes = previousChanges.map(
        change => change.field_value
      );

      // Handle booted contestants
      if (latestChanges.some(change => change.field_value === 'out')) {
        // Handle contestants booted in THIS episode
        if (latestChangeEpisode === episodeObj.id) {
          updatedCastaway.currentBoot = true;
          updatedCastaway.tribe = latestNonOutChange.field_value;
        } else {
          updatedCastaway.tribe = 'out';
        }
        if (latestChanges.some(change => change.details === 'jury')) {
          updatedCastaway.juryMember = true;
        }
        updatedCastaway.bootOrder = latestChanges.find(
          change => change.field_value === 'out'
        ).boot_order;
      } else {
        updatedCastaway.tribe = latestChanges[0].field_value;
      }

      return updatedCastaway;
    });

    // Populate advantage data for each castaway
    episodeObj.castaways = episodeObj.castaways.map(castaway => {
      const updatedCastaway = castaway;
      const currentChanges = seasonAdvantageChanges
        .filter(change => change.start_episode <= episodeObj.id) // filter later advantages
        .filter(
          change => !change.end_episode || change.end_episode > episodeObj.id
        ) // filter past advantages
        .filter(currentChange => currentChange.castaway === castaway.name); // get only changes for castaway

      updatedCastaway.advantages = currentChanges.map(change => {
        return { item: change.field_value, details: change.details };
      });

      if (castawayProfiles.length > 0) {
        wikiUrlPath = castawayProfiles.find(
          castawayProfile => castawayProfile.castaway === castaway.name
        ).wiki_url;
        updatedCastaway.wikiUrl = `https://survivor.fandom.com/wiki/${wikiUrlPath}`;
      }

      return updatedCastaway;
    });

    // Populate tribal council data for each episode
    episodeObj.tribalCouncils = tribalCouncils
      .filter(tribalCouncil => tribalCouncil.episode === episodeObj.id)
      .map(episodeTribalCouncil => {
        const tribalCouncilObject = {
          id: episodeTribalCouncil.id,
          tribalNumber: episodeTribalCouncil.tribal_number,
          tribe: episodeTribalCouncil.tribe,
          finalTribal: episodeTribalCouncil.final_tribal,
          fireMakingTribal: episodeTribalCouncil.fire_making_tribal,
          castawayVotedFor: episodeTribalCouncil.castaway_voted_out,
          notes: episodeTribalCouncil.notes,
          day: episodeTribalCouncil.day_number,
          vote_rounds: []
        };

        // populate vote rounds
        for (let i = 1; i <= episodeTribalCouncil.vote_rounds; i++) {
          let voteRound = {
            round_no: i,
            votes: [],
            advantages: []
          };

          // get only plays from this vote round
          currentPlays = tribalPlays.filter(
            tribalPlay =>
              tribalPlay.tribal_council === tribalCouncilObject.id &&
              tribalPlay.vote_no === i
          );
          // add votes to round
          voteRound.votes = currentPlays
            .filter(tribalPlay => tribalPlay.item_played === 'vote')
            .map(vote => {
              return {
                playedBy: vote.played_by,
                playedOn: vote.played_on
              };
            });

          // add advantage plays to round
          voteRound.advantages = currentPlays
            .filter(tribalPlay => tribalPlay.item_played !== 'vote')
            .map(advantage => {
              return {
                advantage: advantage.item_played,
                playedBy: advantage.played_by,
                playedOn: advantage.played_on
              };
            });

          tribalCouncilObject.vote_rounds.push(voteRound);
        }

        // populate advantage plays

        return tribalCouncilObject;
      });

    // Populate played vote and advantage data for each tribal council

    episodeObj.tribalCouncils = episodeObj.tribalCouncils.map(
      tribal_council => {
        let updatedTribalCouncil = tribal_council;
        return updatedTribalCouncil;
      }
    );

    return episodeObj;
  });

  response.episodes = castawayDataByEpisode;
  response.preseasonStats = preseasonStats;
  res.json(response);
};

module.exports = {
  getSeasonData
};
