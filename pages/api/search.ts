import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { searchItunes } from "@/services/itunes";

// validate the schema
const QuerySchema = z.object({
  term: z.string().min(1, "Search term is required"),
});
type Query = z.infer<typeof QuerySchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // only get method allowed for the api
  if (req.method !== "GET") {
    return res.setHeader("Allow", "GET").status(405).end("Method Not Allowed");
  }

 //valdation
  const parse = QuerySchema.safeParse(req.query);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.errors[0].message });
  }
  const { term } = parse.data as Query;

  try {
    //fetch the results
    const items = await searchItunes(term);

    if (items.length === 0) {
        return res.status(200).json({ data: [] });
      }

      const now = new Date();
      const data = items.map(i => ({
        collectionId:   i.collectionId,
        collectionName: i.collectionName,
        artistName:     i.artistName,
        feedUrl:        i.feedUrl,
        artworkUrl100:  i.artworkUrl100,
        savedAt:        now,             
      }));
      const ids = items.map(i => i.collectionId);
  
      // Fire both queries in a single transaction:
      await prisma.$transaction([
        prisma.podcast.createMany({
          data,
          skipDuplicates: true,          
        }),
        prisma.podcast.updateMany({
          where: { collectionId: { in: ids } },
          data:  { savedAt: now },        
        }),
      ]);


    const saved = await prisma.podcast.findMany({
        where: { collectionId: { in: ids } },
      });

    //return response
    return res.status(200).json({ data: saved });
  } catch (err) {
    console.error("Search API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
