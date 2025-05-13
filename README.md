# Paddle In-App Checkout Starter

[Paddle Billing](https://www.paddle.com/solutions/web-stores?utm_source=dx&utm_medium=paddle-in-app-checkout-starter) is the developer-first merchant of record. We take care of payments, tax, subscriptions, and metrics with one unified API that does it all.

This is a Next.js starter project for implementing a Paddle checkout on Web with an iOS app.

As of April 30, 2025, Apple's updated App Store rules allow app developers to use third-party payment processors like Paddle for in-app purchases. This starter shows you how to implement a web-based checkout that can be opened from iOS apps.

Even though you're redirecting users to Web to complete their purchase, **Apple pay is still supported**.

## ⚡️ Instantly clone & deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPaddleHQ%2Fpaddle-in-app-checkout-starter&env=APPLE_TEAM_ID,NEXT_PUBLIC_BUNDLE_IDENTIFIER,NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,NEXT_PUBLIC_PADDLE_ENV,NEXT_PUBLIC_PADDLE_PRICE_ID)

## 🔦 About

This starter project provides a fully functional implementation of a Paddle checkout within a Next.js application that can be easily embedded into iOS apps.

## ✨ Features

- Global tax compliance — As a merchant of record, Paddle handles all tax calculations, collections, and remittances so you don't have to.
- Chargeback protection — Paddle manages chargebacks, combats fraud, and prevents card attacks, keeping your business secure.
- Lower fees than IAPs — Connect directly with your users to reduce fees while increasing customer lifetime value.
- Integrated with Paddle Retain — Minimize churn and maximize revenue with our comprehensive suite of retention tools.
- Buyer support included — Customers can self-serve through our portal, while Paddle handles all order inquiries.
- All-in-one payment platform — Enable new payment methods instantly without additional code or merchant accounts.

## 📦 Included packages

- Next.js 15
- `@paddle/paddle-js` for launching a checkout
- `next-themes` for light/dark mode support
- React 19
- TypeScript
- Tailwind CSS

## 🗂 Folder layout

- `src` Main application code
  - `app` Next.js app directory
    - `.well-known` Contains Apple app site association file
    - `checkout_redirect` Checkout success and redirect pages
    - `page.tsx` Main checkout page
  - `components` React components
    - `ui` UI components
  - `lib` Utility functions
    - `paddle.tsx` Paddle integration logic

## 🏁 Getting started

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the checkout page.

### Environment variables

Create a `.env.local` file based on `.env.example` with the following variables:

- `APPLE_TEAM_ID` - Your Apple Team ID (for Universal Links)
- `NEXT_PUBLIC_BUNDLE_IDENTIFIER` - Your iOS app's bundle identifier
- `NEXT_PUBLIC_APP_REDIRECT_URL` - The redirect url back to your app
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` - Your Paddle client token
- `NEXT_PUBLIC_PADDLE_ENV` - Paddle environment (`sandbox` or `production`)
- `NEXT_PUBLIC_PADDLE_PRICE_ID` - The ID of your Paddle price
- `NEXT_PUBLIC_THEME` - The theme of your checkout, can be light or dark (optional)

For more detailed setup instructions, check out [Paddle's documentation on opening a checkout from iOS apps](https://developer.paddle.com/build/launch-ios-app-checkout).
