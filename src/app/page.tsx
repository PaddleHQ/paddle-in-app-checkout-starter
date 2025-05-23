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
      className={`
        grid place-items-center mx-auto gap-4 p-0 px-2 
        lg:max-w-6xl lg:mx-auto lg:gap-16 lg:grid-cols-[480px_1fr] lg:p-8 lg:place-items-start
      `}
    >
      <div className="w-full max-w-[min(647px,100vw)] pt-6 lg:order-2">
        {checkoutData ? <ProductDetails checkoutData={checkoutData} /> : <ProductDetailsSkeleton />}
      </div>
      <div className="w-full lg:order-1">
        {checkoutData && <h2 className="hidden lg:block text-2xl py-6 font-semibold leading-none">Payment details</h2>}
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
