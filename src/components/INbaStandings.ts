export interface INbaStandings {
  _internal: Internal;
  league: League;
}

interface Internal {
  pubDateTime: string;
  igorPath: string;
  xslt: string;
  xsltForceRecompile: string;
  xsltInCache: string;
  xsltCompileTimeMillis: string;
  xsltTransformTimeMillis: string;
  consolidatedDomKey: string;
  endToEndTimeMillis: string;
}

interface League {
  standard: Standard;
}

interface Standard {
  seasonYear: number;
  seasonStageId: number;
  conference: Conference;
}

interface Conference {
  east: INBATeamRank[];
  west: INBATeamRank[];
}

export interface INBATeamRank {
  teamId: string;
  win: string;
  loss: string;
  winPct: string;
  winPctV2: string;
  lossPct: string;
  lossPctV2: string;
  gamesBehind: string;
  divGamesBehind: string;
  clinchedPlayoffsCode: string;
  clinchedPlayoffsCodeV2: string;
  confRank: string;
  confWin: string;
  confLoss: string;
  divWin: string;
  divLoss: string;
  homeWin: string;
  homeLoss: string;
  awayWin: string;
  awayLoss: string;
  lastTenWin: string;
  lastTenLoss: string;
  streak: string;
  divRank: string;
  isWinStreak: boolean;
  teamSitesOnly: TeamSitesOnly;
  tieBreakerPts: string;
  sortKey: SortKey;
}

interface TeamSitesOnly {
  teamKey: string;
  teamName: string;
  teamCode: string;
  teamNickname: string;
  teamTricode: string;
  clinchedConference: string;
  clinchedDivision: string;
  clinchedPlayoffs: string;
  streakText: string;
}

interface SortKey {
  defaultOrder: number;
  nickname: number;
  win: number;
  loss: number;
  winPct: number;
  gamesBehind: number;
  confWinLoss: number;
  divWinLoss: number;
  homeWinLoss: number;
  awayWinLoss: number;
  lastTenWinLoss: number;
  streak: number;
}
