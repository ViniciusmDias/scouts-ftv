import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, cpf, temporary_house, observations } = req.body;

  const person = await prisma.person.create({
    data: {
      name,
      cpf,
      temporary_house,
      observations,
    },
  });

  return res.status(201).json(person);
}
