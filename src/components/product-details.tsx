import { OrderSummary } from "@/components/order-summary";
import { ProductImage } from "@/components/product-image";
import { formatBillingCycle, formatCurrency, formatTrialPeriod } from "@/lib/format";
import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

type ProductDetailsProps = {
  checkoutData: CheckoutEventsData;
};

export function ProductDetails({ checkoutData }: ProductDetailsProps) {
  const currency = checkoutData.currency_code;

  const trialPeriod = checkoutData.items?.find((item) => item.trial_period)?.trial_period;
  const billingCycle = checkoutData.items?.find((item) => item.billing_cycle)?.billing_cycle;

  const numberOfPrices = checkoutData.items?.length;

  return (
    <div className="flex flex-col gap-3 px-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {checkoutData.items[0].product.image_url && (
            <ProductImage
              className="-translate-y-1.25"
              imageUrl={checkoutData.items[0].product.image_url}
              name={checkoutData.items[0].product.name}
            />
          )}
          <h2 className="text-lg font-semibold">{checkoutData.items[0].product.name}</h2>
        </div>
        {numberOfPrices > 1 && (
          <p className="pt-1 text-sm text-muted-foreground whitespace-nowrap"> +{numberOfPrices - 1} more</p>
        )}
      </div>

      <div>
        <div className="flex flex-col">
          <p>{formatCurrency(checkoutData.totals.total, currency)} now</p>
          {checkoutData.recurring_totals && billingCycle && (
            <p className="text-sm text-muted-foreground mt-1">
              Then {formatCurrency(checkoutData.recurring_totals.total, currency)}/{formatBillingCycle(billingCycle)}
              {trialPeriod && ` after ${formatTrialPeriod(trialPeriod)}`}
            </p>
          )}
        </div>
      </div>

      <div className="hidden lg:flex">
        <OrderSummary checkoutData={checkoutData} expanded />
      </div>

      <div className="lg:hidden">
        <OrderSummary checkoutData={checkoutData} />
      </div>
    </div>
  );
}
