import { Router } from "express";
import { searchAnimeByQuery, getAnimeById, getRandomPopularFromCache } from "../services/mal.service.js";

const router = Router();

// /api/search/animeByQuery?q=naruto&limit=25
router.get("/animeByQuery", async (req, res) => {
  const { q, limit = 25 } = req.query;

  try {
    console.log(`Fetching anime by query: ${q}`);
    const data = await searchAnimeByQuery({ q, limit: Number(limit) });
    res.json(data);
    console.log("Retrieved Anime(s) by Query");
  } catch (err) {
    console.error("Search by query failed:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Search by query failed" });
  }
});

// /api/search/animeByID/5114
router.get("/animeByID/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Fetching anime by ID: ${id}`);
    const data = await getAnimeById(id);
    res.json(data);
    console.log("Retrieved Anime by ID");
  } catch (err) {
    console.error("Fetch by ID failed:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Fetch by ID failed" });
  }
});

router.get("/random", async (req, res) => {
  try {
    const anime = await getRandomPopularFromCache();
    res.json(anime);
  } catch (err) {
    console.error("Random popular failed:", err.message);
    res.status(500).json({ error: "Failed to get random popular anime" });
  }
});

export default router;
