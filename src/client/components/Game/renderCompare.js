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
  // Prefer Tailwind utilities when available; fall back to local CSS classes.
  return result === 0
    ? "bg-green-700 text-white font-bold cell-correct"
    : "bg-red-600 text-white cell-incorrect";
}

export function cellClassFromBool(result) {
  return result
    ? "bg-green-700 text-white font-bold cell-correct"
    : "bg-red-600 text-white cell-incorrect";
}

export function cellClassFromSet(result) {
  if (result === "exact") return "bg-green-700 text-white font-bold cell-correct"; // green
  if (result === "partial") return "bg-yellow-400 text-black font-bold cell-partial"; // orange
  return "bg-red-600 text-white cell-incorrect"; // red
}