export function updateTeamPoints(game: Game, teams: Team[]): Team[] {
  // Loop through the teams array and update win/loss based on winnerId and loserId in the game
  const updatedTeams = teams.map((team) => {
    if (team.id === game.winnerId) {
      return {
        ...team,
        win: team.win + 1, // Increment win count
      };
    } else if (team.id === game.loserId) {
      return {
        ...team,
        loss: team.loss + 1, // Increment loss count
      };
    }
    return team;
  });

  // Return the updated game object with updated teams
  return updatedTeams;
}
