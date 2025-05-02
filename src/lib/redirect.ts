const redirectUrl = process.env.NEXT_PUBLIC_APP_REDIRECT_URL;

export function getMobileRedirectUrl(transactionId: string): string {
  if (!redirectUrl) {
    throw new Error("Missing redirect URL");
  }

  return `${redirectUrl}?transactionId=${transactionId}`;
}
