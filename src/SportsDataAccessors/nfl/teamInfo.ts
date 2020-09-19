export const nflTeamsInfo = {
  ARI: {
    name: 'Cardinals',
    fullName: 'Arizona Cardinals',
    conference: 'NFC',
    division: 'West'
  },
  ATL: {
    name: 'Falcons',
    fullName: 'Atlanta Falcons',
    conference: 'NFC',
    division: 'South'
  },
  BAL: {
    name: 'Ravens',
    fullName: 'Baltimore Ravens',
    conference: 'AFC',
    division: 'North'
  },
  BUF: {
    name: 'Bills',
    fullName: 'Buffalo Bills',
    conference: 'AFC',
    division: 'East'
  },
  CAR: {
    name: 'Panthers',
    fullName: 'Carolina Panthers',
    conference: 'NFC',
    division: 'South'
  },
  CHI: {
    name: 'Bears',
    fullName: 'Chicago Bears',
    conference: 'NFC',
    division: 'North'
  },
  CIN: {
    name: 'Bengals',
    fullName: 'Cincinnati Bengals',
    conference: 'AFC',
    division: 'North'
  },
  CLE: {
    name: 'Browns',
    fullName: 'Cleveland Browns',
    conference: 'AFC',
    division: 'North'
  },
  DAL: {
    name: 'Cowboys',
    fullName: 'Dallas Cowboys',
    conference: 'NFC',
    division: 'East'
  },
  DEN: {
    name: 'Broncos',
    fullName: 'Denver Broncos',
    conference: 'AFC',
    division: 'West'
  },
  DET: {
    name: 'Lions',
    fullName: 'Detroit Lions',
    conference: 'NFC',
    division: 'North'
  },
  GB: {
    name: 'Packers',
    fullName: 'Green Bay Packers',
    conference: 'NFC',
    division: 'North'
  },
  HOU: {
    name: 'Texans',
    fullName: 'Houston Texans',
    conference: 'AFC',
    division: 'South'
  },
  IND: {
    name: 'Colts',
    fullName: 'Indianapolis Colts',
    conference: 'AFC',
    division: 'South'
  },
  JAC: {
    name: 'Jaguars',
    fullName: 'Jacksonville Jaguars',
    conference: 'AFC',
    division: 'South'
  },
  KC: {
    name: 'Chiefs',
    fullName: 'Kansas City Chiefs',
    conference: 'AFC',
    division: 'West'
  },
  MIA: {
    name: 'Dolphins',
    fullName: 'Miami Dolphins',
    conference: 'AFC',
    division: 'East'
  },
  MIN: {
    name: 'Vikings',
    fullName: 'Minnesota Vikings',
    conference: 'NFC',
    division: 'North'
  },
  NE: {
    name: 'Patriots',
    fullName: 'New England Patriots',
    conference: 'AFC',
    division: 'East'
  },
  NO: {
    name: 'Saints',
    fullName: 'New Orleans Saints',
    conference: 'NFC',
    division: 'South'
  },
  NYG: {
    name: 'Giants',
    fullName: 'NY Giants',
    conference: 'NFC',
    division: 'East'
  },
  NYJ: {
    name: 'Jets',
    fullName: 'NY Jets',
    conference: 'AFC',
    division: 'East'
  },
  LV: {
    name: 'Raiders',
    fullName: 'Las Vegas Raiders',
    conference: 'AFC',
    division: 'West'
  },
  PHI: {
    name: 'Eagles',
    fullName: 'Philadelphia Eagles',
    conference: 'NFC',
    division: 'East'
  },
  PIT: {
    name: 'Steelers',
    fullName: 'Pittsburgh Steelers',
    conference: 'AFC',
    division: 'North'
  },
  LAC: {
    name: 'Chargers',
    fullName: 'Los Angeles Chargers',
    conference: 'AFC',
    division: 'West'
  },
  SF: {
    name: '49ers',
    fullName: 'San Francisco 49ers',
    conference: 'NFC',
    division: 'West'
  },
  SEA: {
    name: 'Seahawks',
    fullName: 'Seattle Seattle Seahawks',
    conference: 'NFC',
    division: 'West'
  },
  LA: {
    name: 'Rams',
    fullName: 'Los Angeles Rams',
    conference: 'NFC',
    division: 'West'
  },
  TB: {
    name: 'Buccaneers',
    fullName: 'Tampa Bay Buccaneers',
    conference: 'NFC',
    division: 'South'
  },
  TEN: {
    name: 'Titans',
    fullName: 'Tennessee Titans',
    conference: 'AFC',
    division: 'South'
  },
  WAS: {
    name: 'Football Team',
    fullName: 'Washington Football Team',
    conference: 'NFC',
    division: 'East'
  }
} as const;

export type nflTeamCodes = keyof typeof nflTeamsInfo;
