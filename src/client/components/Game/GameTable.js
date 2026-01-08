import * as CompareUtils from "./renderCompare"
// import "./Guess.css"

export function GameTable( {guesses, solution} ) {
    return (
        <table className="border-collapse border border-gray-400">
                <thead>
                    <tr>
                            <th className="border border-gray-300">Title</th>
                            <th className="border border-gray-300">Score</th>
                            <th className="border border-gray-300">Popularity</th>
                            <th className="border border-gray-300">Season</th>
                            <th className="border border-gray-300">Genre</th>
                            <th className="border border-gray-300">Studio</th>
                            <th className="border border-gray-300">Source</th>
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
                                <td className={`${CompareUtils.cellClassFromBool(titleCmp)} border border-gray-300`}>
                                    {guess.title}
                                </td>

                                <td className={`${CompareUtils.cellClassFromNumber(scoreCmp)} border border-gray-300`}>
                                    {guess.score} {CompareUtils.renderCompareNumber(scoreCmp)}
                                </td>

                                <td className={`${CompareUtils.cellClassFromNumber(popularCmp)} border border-gray-300`}>
                                    {guess.popularity} {CompareUtils.renderCompareNumber(popularCmp)}
                                </td>

                                <td className={`${CompareUtils.cellClassFromSet(seasonCmp.color)} border border-gray-300`}>
                                    {guess.season.year} {guess.season.season} {CompareUtils.renderCompareNumber(seasonCmp.text)}
                                </td>

                                <td className={`${CompareUtils.cellClassFromSet(genreCmp)} border border-gray-300`}>
                                    {Array.from(guess.genres).join(", ")}
                                </td>

                                <td className={`${CompareUtils.cellClassFromSet(studioCmp)} border border-gray-300`}>
                                    {Array.from(guess.studios).join(", ")} {" "}
                                </td>

                                <td className={`${CompareUtils.cellClassFromBool(guess.compareSource(solution))} border border-gray-300`}>
                                    {guess.source}
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>

            
    )
}