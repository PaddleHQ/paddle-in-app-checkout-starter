"use client";

import { getMobileRedirectUrl } from "@/lib/redirect";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccess() {
  const params = useSearchParams();
  const transactionId = params.get("txn-id");

  return (
    <div className="grid h-dvh place-items-center py-12 px-4">
      {transactionId && (
        <a href={getMobileRedirectUrl(transactionId)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Return to app
        </a>
      )}
    </div>
  );
}
