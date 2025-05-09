import { Separator } from "@/components/ui/separator";
import { formatBillingCycle } from "@/utils/format-billing-cycle";
import { formatCurrency } from "@/utils/format-currency";
import { formatTrialPeriod } from "@/utils/format-trial-period";
import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

type ProductDetailsProps = {
  checkoutData: CheckoutEventsData;
};

export function ProductDetails({ checkoutData }: ProductDetailsProps) {
  const currency = checkoutData.currency_code;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {checkoutData.items[0].product.image_url && (
          <img
            src={checkoutData.items[0].product.image_url}
            alt={checkoutData.items[0].product.name}
            className="w-12 h-12 rounded-lg"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{checkoutData.items[0].product.name}</h2>
          <div className="flex flex-col">
            <p>{formatCurrency(checkoutData.totals.total, currency)} now</p>
            {checkoutData.recurring_totals && checkoutData.items[0].billing_cycle && (
              <p className="text-sm text-muted-foreground">
                Then {formatCurrency(checkoutData.recurring_totals.total, currency)}/
                {formatBillingCycle(checkoutData.items[0].billing_cycle)}
                {checkoutData.items[0].trial_period?.interval &&
                  ` after ${formatTrialPeriod(checkoutData.items[0].trial_period)}`}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col gap-4 mt-8">
        <Separator className="w-full" />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p>{formatCurrency(checkoutData.totals.subtotal, currency)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Tax</p>
          <p>{formatCurrency(checkoutData.totals.tax, currency)}</p>
        </div>
        <Separator className="w-full" />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Total</p>
          <p>{formatCurrency(checkoutData.totals.total, currency)}</p>
        </div>
      </div>
    </div>
  );
}
