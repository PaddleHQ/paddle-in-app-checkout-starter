import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";
import { Separator } from "@/components/ui/separator";

type ProductDetailsProps = {
  checkoutData: CheckoutEventsData;
};

export function ProductDetails({ checkoutData }: ProductDetailsProps) {
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
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: checkoutData.currency_code,
              }).format(checkoutData.totals.total)}{" "}
              now
            </p>
            {checkoutData.recurring_totals && checkoutData.items[0].billing_cycle && (
              <p className="text-sm text-muted-foreground -mt-1">
                Then{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: checkoutData.currency_code,
                }).format(checkoutData.recurring_totals.total)}
                /{checkoutData.items[0].billing_cycle.interval}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-col gap-4 mt-8">
        <Separator className="w-full" />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: checkoutData.currency_code,
            }).format(checkoutData.totals.subtotal)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Tax</p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: checkoutData.currency_code,
            }).format(checkoutData.totals.tax)}
          </p>
        </div>
        <Separator className="w-full" />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Total</p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: checkoutData.currency_code,
            }).format(checkoutData.totals.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
