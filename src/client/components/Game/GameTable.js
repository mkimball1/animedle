import * as GuessUtils from "./Guess";
import "./Guess.css"

const ans = new GuessUtils.Guess({
    "id": 31988,
    "title": "Hibike! Euphonium 2",
    "main_picture": {
        "medium": "https://cdn.myanimelist.net/images/anime/10/81155.webp",
        "large": "https://cdn.myanimelist.net/images/anime/10/81155l.webp"
    },
    "mean": 8.34,
    "rank": 266,
    "popularity": 1076,
    "start_date": "2016-10-06",
    "end_date": "2016-12-29",
    "studios": [
        {
            "id": 2,
            "name": "Kyoto Animation"
        }
    ],
    "source": "novel",
    "genres": [
        {
            "id": 8,
            "name": "Drama"
        },
        {
            "id": 19,
            "name": "Music"
        },
        {
            "id": 70,
            "name": "Performing Arts"
        },
        {
            "id": 23,
            "name": "School"
        }
    ],
    "related_anime": [
        {
            "node": {
                "id": 27989,
                "title": "Hibike! Euphonium",
                "main_picture": {
                    "medium": "https://cdn.myanimelist.net/images/anime/1517/142072.webp",
                    "large": "https://cdn.myanimelist.net/images/anime/1517/142072l.webp"
                }
            },
            "relation_type": "prequel",
            "relation_type_formatted": "Prequel"
        },
        {
            "node": {
                "id": 34204,
                "title": "Hibike! Euphonium 2 Specials",
                "main_picture": {
                    "medium": "https://cdn.myanimelist.net/images/anime/13/83486.jpg",
                    "large": "https://cdn.myanimelist.net/images/anime/13/83486l.jpg"
                }
            },
            "relation_type": "side_story",
            "relation_type_formatted": "Side story"
        },
        {
            "node": {
                "id": 35082,
                "title": "Hibike! Euphonium Movie 2: Todoketai Melody",
                "main_picture": {
                    "medium": "https://cdn.myanimelist.net/images/anime/5/88024.jpg",
                    "large": "https://cdn.myanimelist.net/images/anime/5/88024l.jpg"
                }
            },
            "relation_type": "summary",
            "relation_type_formatted": "Summary"
        },
        {
            "node": {
                "id": 35677,
                "title": "Liz to Aoi Tori",
                "main_picture": {
                    "medium": "https://cdn.myanimelist.net/images/anime/1638/93032.webp",
                    "large": "https://cdn.myanimelist.net/images/anime/1638/93032l.webp"
                }
            },
            "relation_type": "side_story",
            "relation_type_formatted": "Side story"
        },
        {
            "node": {
                "id": 35678,
                "title": "Hibike! Euphonium Movie 3: Chikai no Finale",
                "main_picture": {
                    "medium": "https://cdn.myanimelist.net/images/anime/1141/102223.jpg",
                    "large": "https://cdn.myanimelist.net/images/anime/1141/102223l.jpg"
                }
            },
            "relation_type": "sequel",
            "relation_type_formatted": "Sequel"
        },
        {
            "node": {
                "id": 52931,
                "title": "Kimi wa Tennen Shoku",
                "main_picture": {
                    "medium": "https://cdn.myanimelist.net/images/anime/1629/127523.jpg",
                    "large": "https://cdn.myanimelist.net/images/anime/1629/127523l.jpg"
                }
            },
            "relation_type": "other",
            "relation_type_formatted": "Other"
        }
    ]
})

export function GameTable( {guesses} ) {
    return (
        <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Score</th>
                        <th>Popularity</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th>Studio</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {guesses.map((guess, index) => {
                        const titleCmp = guess.compareTitle(ans);
                        const genreCmp = guess.compareGenres(ans);
                        const yearCmp = guess.compareYear(ans);
                        const studioCmp = guess.compareStudios(ans);
                        const scoreCmp = guess.compareScore(ans)
                        const popularCmp = guess.comparePopularity(ans)
                        return (
                            <tr key={`g${index}`}>
                                <td className={GuessUtils.cellClassFromBool(titleCmp)}>
                                    {guess.title}
                                </td>

                                <td className={GuessUtils.cellClassFromNumber(scoreCmp)}>
                                    {guess.score} {GuessUtils.renderCompareNumber(scoreCmp)}
                                </td>

                                <td className={GuessUtils.cellClassFromNumber(popularCmp)}>
                                    {guess.popularity} {GuessUtils.renderCompareNumber(popularCmp)}
                                </td>

                                <td className={GuessUtils.cellClassFromNumber(yearCmp)}>
                                    {guess.year} {GuessUtils.renderCompareNumber(yearCmp)}
                                    </td>

                                <td className={GuessUtils.cellClassFromSet(genreCmp)}>
                                    {Array.from(guess.genres).join(", ")}
                                </td>

                                <td className={GuessUtils.cellClassFromSet(studioCmp)}>
                                    {Array.from(guess.studios).join(", ")}{" "}
                                </td>

                                <td className={GuessUtils.cellClassFromBool(guess.compareSource(ans))}>
                                    {guess.source}
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
    )
}