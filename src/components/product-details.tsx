import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

type ProductDetailsProps = {
  checkoutData: CheckoutEventsData;
};

export function ProductDetails({ checkoutData }: ProductDetailsProps) {
  return (
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
  );
}
