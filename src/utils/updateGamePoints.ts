export function updateGamePoints(
  game: Game,
  players: Player[],
  teams: Team[]
): Game {
  // Assumindo que os jogadores 1 e 2 estão no time 1, e os jogadores 3 e 4 estão no time 2
  const team1Players = players.slice(0, 2); // Jogadores 1 e 2
  const team2Players = players.slice(2, 4); // Jogadores 3 e 4

  // Função auxiliar para somar os pontos de ataque de um time
  const calculateAttackPoints = (teamPlayers: Player[]): number => {
    return teamPlayers.reduce((total, player) => {
      return (
        total +
        player.sharkAttack +
        player.parallel +
        player.longMiddle +
        player.longDiagonal +
        player.shortDiagonal +
        player.shortMiddle +
        player.backDrop +
        player.block +
        player.free +
        player.ace
      );
    }, 0);
  };

  // Função auxiliar para somar os pontos de bloqueio de um time
  const calculateBlockPoints = (teamPlayers: Player[]): number => {
    return teamPlayers.reduce((total, player) => total + player.block, 0);
  };

  // Função auxiliar para somar os pontos de saque de um time
  const calculateServePoints = (teamPlayers: Player[]): number => {
    return teamPlayers.reduce((total, player) => total + player.ace, 0);
  };

  // Função auxiliar para somar os erros de um time
  const calculateErrors = (teamPlayers: Player[]): number => {
    return teamPlayers.reduce((total, player) => {
      return (
        total + player.attackError + player.netTouchError + player.serveError
      );
    }, 0);
  };

  // Calcular os pontos de ataque, bloqueio, saque e erros de cada time
  const team1AttackPoints = calculateAttackPoints(team1Players);
  const team2AttackPoints = calculateAttackPoints(team2Players);

  const team1BlockPoints = calculateBlockPoints(team1Players);
  const team2BlockPoints = calculateBlockPoints(team2Players);

  const team1ServePoints = calculateServePoints(team1Players);
  const team2ServePoints = calculateServePoints(team2Players);

  const team1Errors = calculateErrors(team2Players);
  const team2Errors = calculateErrors(team1Players);

  const team1TotalPoints =
    team1AttackPoints + team1BlockPoints + team1ServePoints + team1Errors;

  const team2TotalPoints =
    team2AttackPoints + team2BlockPoints + team2ServePoints + team2Errors;

  // Determine winner and loser
  const winnerId =
    team1TotalPoints > team2TotalPoints ? teams[0].id : teams[1].id;
  const loserId =
    team1TotalPoints > team2TotalPoints ? teams[1].id : teams[0].id;

  // Update the game object with calculated values and winner/loser IDs
  return {
    ...game,
    team1AttackPoints,
    team2AttackPoints,
    team1BlockPoints,
    team2BlockPoints,
    team1ServePoints,
    team2ServePoints,
    team1Errors,
    team2Errors,
    team1TotalPoints,
    team2TotalPoints,
    winnerId,
    loserId,
  };
}
