import * as CompareUtils from "./renderCompare"
import "./Guess.css"

export function GameTable( {guesses, solution} ) {
    return (
        <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Score</th>
                        <th>Popularity</th>
                        <th>Season</th>
                        <th>Genre</th>
                        <th>Studio</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {guesses.map((guess, index) => {
                        const titleCmp = guess.compareTitle(solution);
                        const genreCmp = guess.compareGenres(solution);
                        const seasonCmp = guess.compareSeason(solution);
                        const studioCmp = guess.compareStudios(solution);
                        const scoreCmp = guess.compareScore(solution)
                        const popularCmp = guess.comparePopularity(solution)

                        // console.log(seasonCmp)
                        return (
                            <tr key={`g${index}`}>
                                <td className={CompareUtils.cellClassFromBool(titleCmp)}>
                                    {guess.title}
                                </td>

                                <td className={CompareUtils.cellClassFromNumber(scoreCmp)}>
                                    {guess.score} {CompareUtils.renderCompareNumber(scoreCmp)}
                                </td>

                                <td className={CompareUtils.cellClassFromNumber(popularCmp)}>
                                    {guess.popularity} {CompareUtils.renderCompareNumber(popularCmp)}
                                </td>

                                <td className={CompareUtils.cellClassFromSet(seasonCmp.color)}>
                                    {guess.season.year} {guess.season.season} {CompareUtils.renderCompareNumber(seasonCmp.text)}
                                </td>

                                <td className={CompareUtils.cellClassFromSet(genreCmp)}>
                                    {Array.from(guess.genres).join(", ")}
                                </td>

                                <td className={CompareUtils.cellClassFromSet(studioCmp)}>
                                    {Array.from(guess.studios).join(", ")}{" "}
                                </td>

                                <td className={CompareUtils.cellClassFromBool(guess.compareSource(solution))}>
                                    {guess.source}
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
    )
}