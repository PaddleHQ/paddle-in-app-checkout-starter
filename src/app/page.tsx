"use client";

import { ProductDetails } from "@/components/product-details";
import { ProductDetailsSkeleton } from "@/components/product-details-skeleton";
import { usePaddle } from "@/lib/usePaddle";
import { useSearchParams } from "next/navigation";
import { useRedirectWarning } from "@/lib/redirect";

import { Suspense } from "react";

const defaultPriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

function Checkout() {
  useRedirectWarning();
  const params = useSearchParams();
  const userEmail = params.get("email") ?? undefined;
  const appUserId = params.get("app-user-id") ?? undefined;
  const priceId = params.get("price-id") ?? defaultPriceId ?? "";
  const discountCode = params.get("discount-code") ?? undefined;
  const discountId = params.get("discount-id") ?? undefined;

  const { checkoutData } = usePaddle({ priceId, userEmail, appUserId, discountCode, discountId });

  if (!priceId) {
    return <div className="grid place-items-center p-8 text-xl">Missing price ID</div>;
  }

  return (
    <div
      className={`grid mx-auto gap-4 p-0 px-2 
                  lg:w-full lg:grid-cols-[1fr_1fr] lg:p-0 lg:h-screen`}
    >
      <div className="w-full flex justify-center lg:bg-card lg:order-2 lg:h-full">
        <div
          className={`w-full max-w-[min(647px,100vw)] pt-6 
                      lg:px-8 lg:pt-16`}
        >
          {checkoutData ? <ProductDetails checkoutData={checkoutData} /> : <ProductDetailsSkeleton />}
        </div>
      </div>

      <div className="w-full max-w-[min(647px,100vw)] lg:order-1 lg:pt-10 mx-auto">
        {checkoutData && (
          <h2 className="hidden lg:block text-2xl py-6 px-3 font-semibold leading-none">Payment details</h2>
        )}
        <div className="paddle-checkout-frame w-full" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
