"use client";

import { ProductDetails } from "@/components/product-details";
import { ProductDetailsSkeleton } from "@/components/product-details-skeleton";
import { usePaddle } from "@/lib/paddle";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const defaultPriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

function Checkout() {
  const params = useSearchParams();
  const userEmail = params.get("email") ?? undefined;
  const appUserId = params.get("app-user-id") ?? undefined;
  const priceId = params.get("price-id") ?? defaultPriceId ?? "";

  const { checkoutData } = usePaddle({ priceId, userEmail, appUserId });

  if (!priceId) {
    return <div className="grid place-items-center p-8 text-xl">Missing price ID</div>;
  }

  return (
    <div className="grid place-items-center max-w-4xl mx-auto gap-4 p-0 lg:grid-cols-[320px_1fr] lg:gap-16 lg:p-8 lg:place-items-start">
      <div className="p-2 max-w-[643px] w-full pt-6">
        {checkoutData ? <ProductDetails checkoutData={checkoutData} /> : <ProductDetailsSkeleton />}
      </div>
      <div className="paddle-checkout-frame w-full" />
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
