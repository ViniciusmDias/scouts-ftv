import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { teamName1, teamName2, matchNumber } = req.body;

  if (!teamName1 || !teamName2 || !matchNumber) {
    return res
      .status(400)
      .json({ error: "Both team names and matchNumber are required" });
  }

  const convertNumber = Number(matchNumber);

  try {
    // Find the teams by their names
    const [team1, team2] = await Promise.all([
      prisma.team.findUnique({
        where: { name: teamName1 },
      }),
      prisma.team.findUnique({
        where: { name: teamName2 },
      }),
    ]);

    // Check if both teams are found
    if (!team1 || !team2) {
      return res.status(404).json({ error: "One or both teams not found" });
    }

    // Create the match
    const match = await prisma.game.create({
      data: {
        matchNumber: convertNumber,
        teams: {
          connect: [{ id: team1.id }, { id: team2.id }],
        },
      },
    });

    return res.status(201).json(match);
  } catch (error) {
    console.error("Error creating match:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
