import { redirect } from "next/navigation"
import Stripe from "stripe"


if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia", // Use the latest API version
})

export async function createCheckoutSession({ priceId, code }: { priceId: string, code: string }) {
  console.log("createCheckoutSession", priceId, code)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card","promptpay"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  })

  redirect(session.url!)
}

