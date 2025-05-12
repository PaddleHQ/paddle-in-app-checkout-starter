"use client";

import { CheckoutOpenLineItem, type Environments, initializePaddle, type Paddle, type Theme } from "@paddle/paddle-js";
import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

/**
 * Builds an array of items for the checkout.
 * It splits the priceId by commas and creates an item for each priceId.
 * @param priceId - The priceId to create an item for.
 * @returns An array of items for the checkout.
 */
function buildItems(priceId: string | undefined): CheckoutOpenLineItem[] {
  const allPriceIds = priceId?.split(",");
  return allPriceIds?.map((priceId) => ({ priceId, quantity: 1 })) || [];
}

interface UsePaddleProps {
  priceId: string | undefined;
  userEmail?: string;
  // RevenueCat customer ID
  appUserId?: string;
}

export function usePaddle({ priceId, userEmail, appUserId }: UsePaddleProps) {
  const { forcedTheme } = useTheme();
  const router = useRouter();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  useEffect(() => {
    if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        eventCallback: (event) => {
          if (event.name === "checkout.completed") {
            router.push(`/checkout_redirect/success?txn=${event.data?.transaction_id}`);
          }

          if (event.data && event.name) {
            handleCheckoutEvents(event.data);
          }
        },
        checkout: {
          settings: {
            variant: "one-page",
            displayMode: "inline",
            theme: forcedTheme as Theme,
            frameTarget: "paddle-checkout-frame",
            frameInitialHeight: 450,
            frameStyle: "width: 100%; background-color: transparent; border: none",
            showAddDiscounts: false,
          },
        },
      }).then(async (paddle) => {
        if (paddle && priceId) {
          setPaddle(paddle);
          paddle.Checkout.open({
            ...(userEmail && { customer: { email: userEmail } }),
            ...(appUserId && { customData: { app_user_id: appUserId } }),
            items: buildItems(priceId),
          });
        }
      });
    }
  }, [paddle?.Initialized, priceId, userEmail, forcedTheme, router, appUserId]);

  return {
    checkoutData,
    paddle,
  };
}
