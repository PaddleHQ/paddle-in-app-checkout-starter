"use client";

import { getMobileRedirectUrl } from "@/lib/redirect";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function Redirect() {
  const params = useSearchParams();
  const transactionId = params.get("txn-id");

  useEffect(() => {
    if (transactionId) {
      const mobileRedirectUrl = getMobileRedirectUrl(transactionId);

      // Try to open the mobile app via deeplink
      window.location.href = mobileRedirectUrl;

      // Fallback: If the app doesn't open after a delay, redirect to website success page
      const fallbackTimeout = setTimeout(() => {
        window.location.href = `/checkout/success?txn-id=${transactionId}`;
      }, 5000);

      return () => clearTimeout(fallbackTimeout);
    }
  }, [transactionId]);

  return (
    <div className="grid h-screen place-items-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Processing your purchase...</h1>
        <p className="mt-2">You&apos;ll be redirected to the app in a moment.</p>
      </div>
    </div>
  );
}

export default function CheckoutRedirect() {
  return (
    <Suspense>
      <Redirect />
    </Suspense>
  );
}
