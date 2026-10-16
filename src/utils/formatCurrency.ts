
export function formatRupees(amount: number, decimals = 0) {
  const sign = amount < 0 ? '-' : '';
  const [int, frac] = Math.abs(amount).toFixed(decimals).split('.');
  const grouped =
    int.length <= 3
      ? int
      : `${int.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${int.slice(-3)}`;
  return `${sign}₹${grouped}${frac ? `.${frac}` : ''}`;
}