import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());

const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;
const MAL_CLIENT_SECRET = process.env.MAL_CLIENT_SECRET;
const PORT = process.env.PORT || 4000;

// Query anime by name (soft cap at 50 results)
app.get("/api/search/anime", async (req, res) => {
  const { q, limit = 50 } = req.query;
  try {
    console.log("Fetching data...");
    const url = "https://api.myanimelist.net/v2/anime";

    let response = await axios.get(url, {
      headers: {
        "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
      },
      params: {
        q,
        limit: limit,
        fields: "id,title",
      },
    });

    res.json(response.data);

  } catch (err) {
    console.error("Search failed:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Search failed" });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));