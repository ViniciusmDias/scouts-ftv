enum Side {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface Errors {
  attackError: number;
  defenseError: number;
  netTouchError: number;
  serveError: number;
  setError: number;
  receptionError: number;
}

interface Player {
  id: string;
  name: string;
  side: Side;
  created_at: Date;
  updated_at: Date;
  sharkAttack: number;
  sharkAttackAttempts: number;
  parallel: number;
  parallelAttempts: number;
  longMiddle: number;
  longMiddleAttempts: number;
  longDiagonal: number;
  longDiagonalAttempts: number;
  shortDiagonal: number;
  shortDiagonalAttempts: number;
  shortMiddle: number;
  shortMiddleAttempts: number;
  backDrop: number;
  backDropAttempts: number;
  block: number;
  blockAttempts: number;
  free: number;
  freeAttempts: number;
  ace: number;
  aceAttempts: number;
  attackError: number;
  defenseError: number;
  netTouchError: number;
  serveError: number;
  setError: number;
  receptionError: number;
  Team: Team[];
}

interface Team {
  id: string;
  name: string;
  games: Game[];
  win: number;
  loss: number;
  gamesAsWinner: Game[];
  gamesAsLoser: Game[];
  created_at: Date;
  updated_at: Date;
  Player: Player[];
}

interface Game {
  id: string;
  teams: Team[];
  team1AttackPoints: number;
  team1BlockPoints: number;
  team1ServePoints: number;
  team1Errors: number;
  team1TotalPoints: number;
  team2AttackPoints: number;
  team2BlockPoints: number;
  team2ServePoints: number;
  team2Errors: number;
  team2TotalPoints: number;
  winnerId: string;
  loserId: string;
  matchNumber: number;
  created_at: Date;
  updated_at: Date;
}
