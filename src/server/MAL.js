import axios from "axios"


// Search anime by name & get ID
export async function searchAnime(title, limit = 10) {
  const res = await axios.get("http://localhost:4000/api/search/anime", {
    params: { q: title, limit }
  });
  return res.data;
}