import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const { searchValue } = req.query;

  if (!searchValue || typeof searchValue !== "string") {
    return res.status(400).json({ message: "Invalid searchValue" });
  }

  try {
    // const person = await prisma.person.findFirst({
    //   where: {
    //     cpf: cpf,
    //   },
    // });
    const people = await prisma.person.findMany({
      where: {
        OR: [
          {
            name: { mode: "insensitive", contains: searchValue.toLowerCase() },
          },
          {
            temporary_house: {
              mode: "insensitive",
              contains: searchValue.toLowerCase(),
            },
          },
          { cpf: { mode: "insensitive", contains: searchValue.toLowerCase() } },
        ],
      },
    });

    if (!people) {
      return res
        .status(404)
        .json({ message: "people with that CPF not found" });
    }

    return res.json(people);
  } catch (error) {
    console.error("Error fetching person by CPF:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
