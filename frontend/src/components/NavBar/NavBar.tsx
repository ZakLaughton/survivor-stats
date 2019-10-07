import React, {
  useState,
  useEffect,
  FunctionComponent,
  Component,
  ReactElement,
  ReactComponentElement,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PROD_BACKEND_URL } from '../../constants';
import './NavBar.css';

interface NavBarProps {
  incrementEpisode: () => void;
  decrementEpisode: () => void;
  seasonNumber: number;
  episodeNumber: number;
  atEarliestEpisode: () => boolean;
  atLatestEpisode: () => boolean;
}

interface SeasonDirectoryEntry {
  season_no: number;
  title: string;
  info_message?: string | null;
  active: boolean;
}

const NavBar: FunctionComponent<NavBarProps> = ({
  incrementEpisode,
  decrementEpisode,
  seasonNumber,
  episodeNumber,
  atEarliestEpisode,
  atLatestEpisode,
}) => {
  const [seasonDirectory, setSeasonDirectory] = useState<SeasonDirectoryEntry[]>([]);
  const STARTING_EPISODE_NUMBER = 0;
  let seasonTitle = `Loading...`;

  seasonTitle =
    seasonNumber && !!seasonDirectory.length
      ? seasonDirectory.find(season => seasonNumber === season.season_no)!.title
      : `Loading...`;

  // TODO: Set this with an isDropdownOpen component in state
  const closeDropdown = () => {
    document.querySelector(`.dropdown`)!.classList.remove(`active`);
  };

  const updateSeasonDirectory = async () => {
    const response = await fetch(`${PROD_BACKEND_URL}/seasons`);
    const newSeasonDirectory: SeasonDirectoryEntry[] = await response.json();
    const sortedActiveSeasons = newSeasonDirectory
      .filter(season => season.active === true)
      .sort((a, b) => b.season_no - a.season_no);
    setSeasonDirectory(sortedActiveSeasons);
  };

  useEffect(() => {
    async function fetchData() {
      await updateSeasonDirectory();
    }
    fetchData();
  }, []);

  const openDropdown = () => {
    document.querySelector(`.dropdown`)!.classList.add(`active`);
  };
  return (
    <StyledNavBar className='navbar'>
      {
        <SeasonSelector className='dropdown' onMouseLeave={closeDropdown} onTouchEnd={openDropdown}>
          {
            <DropdownButton onMouseEnter={openDropdown}>
              <SeasonTitle>{seasonTitle}</SeasonTitle>
              <SeasonTitleIconContainer>
                <i className='fas fa-caret-down' />
              </SeasonTitleIconContainer>
            </DropdownButton>
          }
          <div className='dropdown-content'>
            {seasonDirectory.map(season => (
              <StyledLink to={`/${season.season_no}`} key={season.season_no}>
                <SeasonOption
                  key={season.season_no}
                  className={`season-option ${season.season_no === seasonNumber && `selected`}`}
                >
                  {season.season_no.toString()}
                  {`: `}
                  {season.title}
                </SeasonOption>
              </StyledLink>
            ))}
          </div>
        </SeasonSelector>
      }

      <EpisodeSelector>
        <EpisodeArrow
          left
          hidden={atEarliestEpisode()}
          className='fas fa-caret-left'
          onClick={decrementEpisode}
        />
        <EpisodeTitle>
          {episodeNumber === STARTING_EPISODE_NUMBER ? `START` : `EPISODE ${episodeNumber}`}
        </EpisodeTitle>
        {/*
        // @ts-ignore - Weird click event issues I'm not going to figure out right now*/}
        <EpisodeArrow
          right
          hidden={atLatestEpisode()}
          className='fas fa-caret-right episode-arrow right'
          onClick={incrementEpisode}
        />
      </EpisodeSelector>
      <SiteTitle>Survivor Stats</SiteTitle>
    </StyledNavBar>
  );
};

const StyledNavBar = styled.header`
  background-color: #111;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  position: sticky;
  top: 0;
  width: 100%;
  align-items: center;
  grid-template-areas: 'season episode title';
  font-family: Arial;

  @media only screen and (max-width: 671px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'title title'
      'season episode';
  }
`;

const SeasonSelector = styled.div`
  grid-area: season;
  height: 40px;
  overflow: hidden;
`;

const DropdownButton = styled.div`
  font-size: 16px;
  border: none;
  outline: none;
  color: rgb(255, 255, 255, 0.8);
  height: 100%;
  background-color: inherit;
  font-family: 'Londrina Solid', sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  margin: 0; /* Important for vertical align on mobile phones */
  display: inline-grid;
  grid-auto-flow: column;
  grid-template-columns: auto auto;
  align-items: center;
  margin-left: 5px;
`;

const SeasonTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
`;

const SeasonTitleIconContainer = styled.div`
  padding-left: 8px;
  font-size: 0.8em;
  padding-right: 8px;
`;

const SeasonOption = styled.div`
  font-size: 16px;
  text-decoration: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const EpisodeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 124px 1fr;
  grid-template-areas: 'left-arrow episode right-arrow';
  align-items: center;
  justify-self: center;
  align-self: stretch;
  height: 40px;
  font-family: 'Londrina Solid', sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
  color: white;
  user-select: none;
  grid-area: episode;
`;

const EpisodeTitle = styled.h2`
  display: inline;
  font-weight: 400;
  font-size: 1.8rem;
  justify-self: center;
  /* Override other h2 properties */
  margin-block-start: 0;
  margin-block-end: 0;
  grid-area: episode;
`;

interface EpisodeArrowProps {
  left: boolean;
  hidden: boolean;
}

const EpisodeArrow = styled.i`
  display: inline-block;
  padding: 0px 9px;
  font-size: 2rem;
  justify-self: ${(props: EpisodeArrowProps) => (props.left ? `end` : `start`)};
  visibility: ${(props: EpisodeArrowProps) => (props.hidden ? `hidden` : `default`)};
  grid-area: ${(props: EpisodeArrowProps) => (props.left ? `left-arrow` : `right-arrow`)};
`;

const SiteTitle = styled.h1`
  margin: 0px;
  justify-self: end;
  font-family: 'Survivant';
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(255, 255, 255, 0.8);
  padding-right: 5px;
  grid-area: title;
`;

export default NavBar;
