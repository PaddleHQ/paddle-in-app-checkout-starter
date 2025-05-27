import { CheckoutEventsData } from "@paddle/paddle-js";
import { formatCurrency } from "@/lib/format";

import { ProductImage } from "@/components/product-image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface Props {
  checkoutData: CheckoutEventsData;
  expanded?: boolean;
}

export function OrderSummary(props: Props) {
  const { checkoutData } = props;

  const currencyCode = checkoutData.currency_code;

  const hasImage = checkoutData.items.some((item) => item.product.image_url);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mx-auto bg-card rounded-lg lg:bg-background"
      defaultValue={props.expanded ? "order-summary" : undefined}
    >
      <AccordionItem value="order-summary">
        <AccordionTrigger className="text-md hover:no-underline cursor-pointer px-4">
          <h3 className="text-md">Show order summary</h3>
        </AccordionTrigger>

        <AccordionContent className="px-4">
          <div className="mt-4">
            <div className="space-y-3">
              {checkoutData.items.map((item) => (
                <div key={item.price_id} className="flex items-center gap-3 text-sm">
                  {hasImage && (
                    <>
                      {item.product.image_url ? (
                        <ProductImage imageUrl={item.product.image_url || ""} name={item.product.name} />
                      ) : (
                        <div className="w-8.5 h-8.5 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xl">
                          {item.product.name.charAt(0)}
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex-1 min-w-0 w-0">
                    <p className="font-medium truncate notranslate">{item.product.name}</p>

                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground notranslate">
                        {formatCurrency(item.totals.total, currencyCode, undefined)}
                      </p>
                      <span className="text-muted-foreground notranslate">x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-8">
              <Separator className="w-full mb-1" />
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="notranslate">{formatCurrency(checkoutData.totals.subtotal, currencyCode, undefined)}</p>
              </div>

              {checkoutData.totals.discount > 0 && (
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Discount</p>
                  <p className="notranslate">
                    - {formatCurrency(checkoutData.totals.discount, currencyCode, undefined)}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <p className="text-muted-foreground">Tax</p>
                <p className="notranslate">{formatCurrency(checkoutData.totals.tax, currencyCode, undefined)}</p>
              </div>
              <Separator className="w-full my-1" />
              <div className="flex justify-between">
                <p className="text-muted-foreground">Total</p>
                <p className="notranslate">{formatCurrency(checkoutData.totals.total, currencyCode, undefined)}</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
