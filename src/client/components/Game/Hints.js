export const HINTS = [
  { key: "episodes",   label: "Episodes",                 unlockAtGuesses: 2 },
  { key: "themes",     label: "Opening/Ending Themes",    unlockAtGuesses: 4 },
  { key: "recs",       label: "Similar Shows",            unlockAtGuesses: 6 },
  { key: "imgBlur",    label: "Picture (blurred)",        unlockAtGuesses: 0},
  { key: "synopsis1",  label: "1st sentence of synopsis", unlockAtGuesses: 10 },
];

export function firstSentence(text = "") {
  const trimmed = text.trim();
  if (!trimmed) return "N/A";
  const idx = trimmed.search(/[.!?]\s/);
  return idx === -1 ? trimmed : trimmed.slice(0, idx + 1);
}

export function renderHint(hintKey, details) {
  if (!details) return "Loading...";
  console.log("details", details)
  switch (hintKey) {
    case "episodes":
      return details.num_episodes ?? "Unknown";

    case "themes": {
      const ops = details.themes["opening"] ?? [];
      const eds = details.themes["ending"] ?? [];
      return (
        <div>
          <div><b>OP</b>: {ops.map((v, k) => (<p key={`op${k}`}> {v.text} </p>))} </div>
          <div><b>ED</b>: {eds.map((v, k) => (<p key={`op${k}`}> {v.text} </p>))} </div>
        </div>
      );
    }

    case "recs": {
      const recs = details.similar ?? [];
      return recs.length
        ? recs.slice(0, 5).map((r, k) => (<ul k={`rec${k}`}> {r.node.title} </ul>))
        : "N/A";
    }

    case "synopsis1":
      return firstSentence(details.synopsis);

    case "imgBlur":
      const src = details.main_picture?.medium || details.main_picture?.large;
      if (!src) return "N/A";
      const blurred = hintKey === "imgBlur";
      return (
        <img
          src={src}
          alt="hint"
          style={{
            width: 220,
            borderRadius: 12,
            filter: "blur(5px)",
          }}
        />
      );

    default:
      return "N/A";
  }
}


export function HintsPanel({ guesses, solution }) {
  const unlockedHints = HINTS.filter(h => guesses.length >= h.unlockAtGuesses);

  if (!unlockedHints.length) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <h3>Hints</h3>

      {unlockedHints.map(h => (
        <div key={h.key} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 700 }}>
            {h.label} <span style={{ fontWeight: 400, opacity: 0.7 }}>(unlocked at {h.unlockAtGuesses} guesses)</span>
          </div>

          <div style={{ marginTop: 6 }}>
            {renderHint(h.key, solution)}
          </div>
        </div>
      ))}
    </div>
  );
}
