export function getMobileRedirectUrl(transactionId: string): string {
  // Create a deeplink URL for both iOS and Android
  // Format: yourapp://checkout/success?transactionId=123
  return `yourapp://checkout/success?transactionId=${transactionId}`;
}
