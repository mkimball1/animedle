import axios from "axios";
import fs from "fs";
import path from "path";

const SERVER_BASE = "http://localhost:4000";
const OUT_FILE = path.resolve("server/cache/popular2000_ids.json");

const TOTAL = 2000;
const LIMIT = 100;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function buildCache() {
  const ids = [];

  for (let offset = 0; offset < TOTAL; offset += LIMIT) {
    console.log(`Fetching ranks ${offset + 1}–${offset + LIMIT}...`);

    const res = await axios.get(`${SERVER_BASE}/internal/mal/ranking/bypopularity`, {
      params: { limit: LIMIT, offset },
    });

    const page = res.data?.data ?? [];
    for (const entry of page) {
      const id = entry?.node?.id;
      if (typeof id === "number") ids.push(id);
    }

    // be nice to MAL via your server
    await sleep(250);
  }

  // de-dupe just in case
  const unique = Array.from(new Set(ids));

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(unique, null, 2), "utf-8");

  console.log(`Saved ${unique.length} IDs → ${OUT_FILE}`);
}

buildCache().catch((err) => {
  console.error("buildCache failed:", err.response?.data || err.message);
  process.exit(1);
});