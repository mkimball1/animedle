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