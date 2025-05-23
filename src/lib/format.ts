import { CheckoutEventsTimePeriod } from "@paddle/paddle-js";

/**
 * Formats the billing cycle for a subscription price
 * @param billingCycle - The billing cycle to format.
 * @returns The formatted billing cycle.
 */
export function formatBillingCycle(billingCycle: CheckoutEventsTimePeriod | null | undefined): string {
  if (!billingCycle) {
    return "";
  }

  const { frequency, interval } = billingCycle;
  return frequency === 1 ? interval : `${frequency} ${interval}s`;
}

/**
 * Formats a currency amount.
 * @param amount - The amount to format.
 * @param currency - The currency to format.
 * @param locale - The locale to format.
 * @returns The formatted currency amount.
 */
export function formatCurrency(amount: number, currency: string, locale: string | undefined = undefined) {
  // this is copied from the Paddle Checkout so the currencies are formatted the same way

  // NB. navigator doesn't look like it has all of these keys. We need to investigate if we need browserLanguage, systemLanguage and userLanguage here
  // @ts-expect-error - navigator is not typed
  const { language, browserLanguage, systemLanguage, userLanguage } = navigator;

  const browserLocale = language || browserLanguage || systemLanguage || userLanguage || "en-US";

  return new Intl.NumberFormat(browserLocale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formats the trial period for a subscription price.
 * @param trialPeriod - The trial period to format.
 * @returns The formatted trial period.
 */
export function formatTrialPeriod(trialPeriod: CheckoutEventsTimePeriod) {
  const interval = trialPeriod.frequency === 1 ? trialPeriod.interval : `${trialPeriod.interval}s`;

  return `${trialPeriod.frequency} ${interval}`;
}
