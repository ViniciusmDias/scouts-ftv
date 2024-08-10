// pages/api/game/update.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma"; // Assuming you have a prisma instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { players, updatedGame: game, updatedTeams: teams } = req.body;

    // Check if game has an id
    if (!game || !game.id) {
      return res.status(400).json({ error: "Game or game ID is missing" });
    }

    // Check if players array is not empty and each player has an id
    if (!Array.isArray(players) || players.length === 0) {
      return res
        .status(400)
        .json({ error: "Players array is missing or empty" });
    }

    for (const player of players) {
      if (!player.id) {
        return res.status(400).json({ error: "Player ID is missing" });
      }
    }

    try {
      // Start a transaction to ensure all updates succeed or fail together
      await prisma.$transaction(async (prisma) => {
        // Update each player
        for (const player of players) {
          await prisma.player.update({
            where: { id: player.id },
            data: { ...player },
          });
        }

        // Update each team, excluding the 'Player' property
        for (const team of teams) {
          const { Player: _, ...teamData } = team; // Extract 'Player' and discard it

          await prisma.team.update({
            where: { id: team.id },
            data: { ...teamData }, // Spread the team object, excluding 'Player'
          });
        }

        // Update the game, omitting the `teams` relation
        const { teams: _, ...gameData } = game; // Extract 'teams' and discard it

        await prisma.game.update({
          where: { id: game.id },
          data: { ...gameData }, // Spread the game object, excluding 'teams'
        });
      });

      res
        .status(200)
        .json({ message: "Players, teams, and game updated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Failed to update players, teams, or game" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
