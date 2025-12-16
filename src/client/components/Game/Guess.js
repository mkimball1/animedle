const SEASON_ORDER = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall:   3,
  };

export class Guess {
  
  constructor(data) {
    this.id = data.id;
    this.title = data.title;

    // this.year = String(data.start_date).slice(0, 4);
    // console.log(data)
    this.season = data.start_season
    this.score = data.mean;
    this.popularity = data.popularity;

    this.genres = new Set(data.genres.map(g => g.name));
    this.studios = new Set(data.studios.map(s => s.name));

    this.source = data.source;
  }

  // -1, 0, 1 comparisons
  compareTitle(other) {
    return this.title === other.title;
  }

  

  compareSeason(other) {
    var res = {
        "text": null,
        "color": "incorrect"
    }
    if (this.season.year !== other.season.year) {
      res.text = Math.sign(other.season.year - this.season.year)  
      return res
    }

    // Same year → compare season
    res.color = "partial"
    const season_order = Math.sign(SEASON_ORDER[other.season.season] - SEASON_ORDER[this.season.season])
    if ((season_order) === 0) {res.color = "exact"}
    res.text = season_order
    return res
  }

  compareScore(other) {
    return Math.sign(other.score - this.score);
  }

  comparePopularity(other) {
    return Math.sign(this.popularity - other.popularity);
  }

  // Boolean comparisons
  compareGenres(other) {
    // exact match
    if (Guess.setsEqual(this.genres, other.genres)) {
      return "exact";
    }

    // partial match (intersection exists)
    for (const g of this.genres) {
      if (other.genres.has(g)) {
        return "partial";
      }
    }

    // no match
    return "none";
  }

  compareStudios(other) {
    if (Guess.setsEqual(this.studios, other.studios)) {
      return "exact";
    }

    for (const s of this.studios) {
      if (other.studios.has(s)) {
        return "partial";
      }
    }

    return "none";
  }

  compareSource(other) {
    return this.source === other.source;
  }

  // Utility
  static setsEqual(a, b) {
    if (a.size !== b.size) return false;
    for (const v of a) {
      if (!b.has(v)) return false;
    }
    return true;
  }

}

export const CMP_ICON = {
  up: "⬆️",
  down: "⬇️",
};

export function renderCompareNumber(result) {
  if (result === 1) return CMP_ICON.up;
  if (result === -1) return CMP_ICON.down;
  return;
}

export function renderCompareBool(result) {
  return result ? CMP_ICON.equal : CMP_ICON.no;
}

export function cellClassFromNumber(result) {
  return result === 0 ? "cell-correct" : "cell-incorrect";
}

export function cellClassFromBool(result) {
  return result ? "cell-correct" : "cell-incorrect";
}

export function cellClassFromSet(result) {
  if (result === "exact") return "cell-correct";   // green
  if (result === "partial") return "cell-partial"; // orange
  return "cell-incorrect";                         // red
}