import axios from "axios"


// Search anime by query
export async function searchAnimeByQuery(title) {
  const res = await axios.get("http://localhost:4000/api/search/animeByQuery", {
    params: { q: title }
  });
  return res.data;
}

// Search anime by ID
export async function searchAnimeByID(id) { 
  const res = await axios.get(
    `http://localhost:4000/api/search/animeByID/${id}`
  );
  return res.data;
}


