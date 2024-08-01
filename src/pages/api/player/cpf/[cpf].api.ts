import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const { cpf } = req.query;

  if (!cpf || typeof cpf !== "string") {
    return res.status(400).json({ message: "Invalid CPF" });
  }

  try {
    const person = await prisma.person.findFirst({
      where: {
        cpf: cpf,
      },
    });

    if (!person) {
      return res
        .status(404)
        .json({ message: "person with that CPF not found" });
    }

    return res.json(person);
  } catch (error) {
    console.error("Error fetching person by CPF:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
