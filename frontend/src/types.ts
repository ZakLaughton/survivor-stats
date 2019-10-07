export interface ActiveSeasonData {
  episodes: Episode[];
  preseasonStats: PreseasonStat[] | null;
  season: number;
  tribes: Tribe[];
}

export interface PreseasonStat {
  line: number;
  stat: string;
  value: string;
}

export interface Tribe {
  name: string;
  tribe_color: string;
}

export interface Episode {
  active: boolean;
  castaways: Castaway[];
  id: string;
  tribalCouncils: TribalCouncil[];
}

export interface Castaway {
  advantages?: Advantage[];
  bootOrder?: number;
  currentBoot?: boolean;
  formerTribes?: Tribe[];
  juryMember?: boolean;
  name: string;
  nickname?: string | null;
  tribe: string;
  wikiUrl: string;
  age: number;
  currentResidence: string;
}

export interface TribalCouncil {
  castawayVotedFor: string;
  day: number;
  finalTribal: boolean;
  fireMakingTribal: boolean;
  id: number;
  notes: string | null;
  tribalNumber: number | null;
  tribe: string;
  voteRounds: VoteRound[]
}

export interface Advantage {
  details?: string;
  item: string;
}

export interface VoteRound {
  advantages: AdvantagePlays[];
  round_no: number | undefined;
  votes: Vote[];

}

export interface AdvantagePlays {
  advantage: string;
  playedBy: string;
  playedOn: string;
}

export interface Vote {
  playedBy: string;
  playedOn: string;
}