import fs from "fs";
import path from "path";

// in-memory cache
const memoryCache = new Map();

export function getCachedIds(name) {
  if (memoryCache.has(name)) {
    return memoryCache.get(name);
  }

  const filePath = path.resolve(`./cache/${name}_ids.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Cache file not found: ${filePath}`);
  }

  const ids = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error(`Cache file empty or invalid: ${filePath}`);
  }

  memoryCache.set(name, ids);
  return ids;
}