// "12312027" -> "12 / 31 / 2027"  (mm / dd / yyyy)
export function formatDate(digits: string) {
  let out = digits.slice(0, 2);
  if (digits.length > 2) {
    out += ` / ${digits.slice(2, 4)}`;
  }
  if (digits.length > 4) {
    out += ` / ${digits.slice(4, 8)}`;
  }
  return out;
}