import { Router } from "express";
import { localhostOnly } from "../middleware/localhostOnly.js";
import { getPopularityRankingPage } from "../services/mal.service.js";

const router = Router();

router.use(localhostOnly);

// /internal/mal/ranking/bypopularity?limit=100&offset=0
router.get("/mal/ranking/bypopularity", async (req, res) => {
  try {
    const limit = Number(req.query.limit ?? 100);
    const offset = Number(req.query.offset ?? 0);

    const data = await getPopularityRankingPage({ limit, offset });
    res.json(data);
  } catch (err) {
    console.error("[internal ranking] MAL error:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch MAL ranking" });
  }
});

export default router;
