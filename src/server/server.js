import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());

const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID;
const MAL_CLIENT_SECRET = process.env.MAL_CLIENT_SECRET;
const PORT = process.env.PORT || 4000;

// Query anime by name (soft cap at 25 results)
app.get("/api/search/animeByQuery", async (req, res) => {
  const { q, limit = 25 } = req.query;
  try {
    console.log(`Fetching anime by query: ${q}`);
    const url = "https://api.myanimelist.net/v2/anime";

    let response = await axios.get(url, {
      headers: {
        "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
      },
      params: {
        q,
        limit: limit,
        fields: "id,title,main_picture",
      },
    });

    res.json(response.data);
    console.log("Retrieved Anime(s) by Query")

  } catch (err) {
    console.error("Search by query failed:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Search by query failed" });
  }
});

// Query anime by id 
app.get("/api/search/animeByID/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Fetching anime by ID: ${id}`);
    const url = `https://api.myanimelist.net/v2/anime/${id}`;

    let response = await axios.get(url, {
      headers: {
        "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
      },
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
        ].join(",")
      },
    });

    res.json(response.data);
    console.log("Retrieved Anime by ID")

  } catch (err) {
    console.error("Fetch by ID failed:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: "Fetch by ID failed" });
  }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


