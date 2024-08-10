import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { gameId } = req.query;

  if (Array.isArray(gameId)) {
    return res.status(400).json({ error: 'Invalid gameId' });
  }

  try {
    // Fetch the game with related teams and players
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        teams: {
          include: {
            Player: true,
          },
        },
      },
    });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    console.log(game, 'game');

    return res.status(200).json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the game' });
  }
}
