import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const lastPeople = await prisma.person.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 10,
  });

  if (!lastPeople) {
    return res.status(400).json({ message: "Doesnt have any player yet" });
  }

  return res.json(lastPeople);
}
