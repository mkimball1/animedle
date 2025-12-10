import axios from "axios"


// Search anime by name & get ID
export async function searchAnime(title) {
  const res = await axios.get("http://localhost:4000/api/search/anime", {
    params: { q: title }
  });
  return res.data;
}