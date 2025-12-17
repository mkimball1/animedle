import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? "http://localhost:4000",
});

// Search anime by query
export async function searchAnimeByQuery(title) {
  const res = await api.get("/api/search/animeByQuery", {
    params: { q: title },
  });
  return res.data;
}

// Search anime by ID
export async function searchAnimeByID(id) {
  const res = await api.get(`/api/search/animeByID/${id}`);
  return res.data;
}

export async function getRandomAnime() {
  const res = await api.get("/api/search/random");
  return res.data;
}
