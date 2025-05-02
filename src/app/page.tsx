"use client";

import { ProductDetails } from "@/components/product-details";
import { ProductDetailsSkeleton } from "@/components/product-details-skeleton";
import { usePaddle } from "@/lib/paddle";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Checkout() {
  const params = useSearchParams();
  const userEmail = params.get("email") ?? undefined;
  const appUserId = params.get("app-user-id") ?? undefined;

  const { checkoutData } = usePaddle({ priceId: "pri_01jqe92zv7x93y7kv01emkra5z", userEmail, appUserId });

  return (
    <div className="grid place-items-center">
      <div className="p-2 w-[300px] pt-6">
        {checkoutData ? <ProductDetails checkoutData={checkoutData} /> : <ProductDetailsSkeleton />}
      </div>
      <div className="paddle-checkout-frame" />
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
