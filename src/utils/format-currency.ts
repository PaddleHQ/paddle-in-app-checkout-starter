export function formatCurrency(amount: number, currency: string, locale: string = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
