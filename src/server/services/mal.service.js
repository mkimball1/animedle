import axios from "axios";
import "dotenv/config";

import { getCachedIds } from "./cache.service.js"

const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;

const mal = axios.create({
  baseURL: "https://api.myanimelist.net/v2",
  headers: { "X-MAL-CLIENT-ID": MAL_CLIENT_ID },
});

export async function searchAnimeByQuery({ q, limit = 25 }) {
  const res = await mal.get("/anime", {
    params: {
      q,
      limit,
      fields: "id,title,main_picture",
    },
  });
  return res.data;
}

export async function getAnimeById(id) {
  const res = await mal.get(`/anime/${id}`, {
    params: {
      fields: [
        "id",
        "title",
        "main_picture",
        "mean",
        "rank",
        "popularity",
        "start_date",
        "end_date",
        "studios",
        "source",
        "genres",
        "related_anime",
        "media_type",
        "start_season",
      ].join(","),
    },
  });
  return res.data;
}

// used to build cache
export async function getPopularityRankingPage({ limit = 100, offset = 0 }) {
  const res = await mal.get("/anime/ranking", {
    params: {
      ranking_type: "bypopularity",
      limit,
      offset,
      fields: "id",
    },
  });
  return res.data;
}

export async function getRandomPopularFromCache() {
  const ids = getCachedIds("popular2000");
  const randomId = ids[Math.floor(Math.random() * ids.length)];
  return getAnimeById(randomId);
}
