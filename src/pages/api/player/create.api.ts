import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, side, teamName } = req.body;

  if (!name || !side || !teamName) {
    return res
      .status(400)
      .json({ error: "Name, side, and teamName are required" });
  }

  try {
    let teamExists = await prisma.team.findUnique({
      where: { name: teamName },
    });

    if (!teamExists) {
      teamExists = await prisma.team.create({
        data: { name: teamName },
      });
    }

    // Create or find the team
    const team = await prisma.team.upsert({
      where: { name: teamName },
      update: {},
      create: {
        name: teamName,
        Player: {
          // If creating a new team, this is where you add the player to it
          create: [{ name, side }],
        },
      },
    });

    // Create the player and link to the team
    const player = await prisma.player.create({
      data: {
        name,
        side,
        Team: {
          connect: { id: team.id },
        },
      },
    });

    return res.status(201).json(player);
  } catch (error) {
    console.error("Error creating player and adding to team:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
