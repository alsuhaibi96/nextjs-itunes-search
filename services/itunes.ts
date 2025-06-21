import { ItunesRawResult, ItunesSearchResponse } from "@/types/itunes";

const ITUNES_BASE = process.env.ITUNES_API || "https://itunes.apple.com";

export async function searchItunes(term: string): Promise<ItunesRawResult[]> {
  const url = `${ITUNES_BASE}/search?media=podcast&term=${encodeURIComponent(term)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`iTunes API returned ${res.status}`);
  }

  const payload = (await res.json()) as ItunesSearchResponse;
  return payload.results.map(r => ({
    collectionId:   r.collectionId,
    collectionName: r.collectionName,
    artistName:     r.artistName,
    feedUrl:        r.feedUrl,
    artworkUrl100:  r.artworkUrl100,
  }));
}