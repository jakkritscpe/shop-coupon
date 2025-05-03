import { redirect } from "next/navigation";
import Stripe from "stripe";
import axios from "axios";
import { getOrigin } from "@/lib/utils";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia", // Use the latest API version
});

// get api/config?name=paymentMethod by axios.
export async function getPaymentMethod(origin: string) {
  const response = await axios.get(`${origin}/api/config?name=paymentMethod`);

  if (!response.data) {
    return [];
  }

  if (response.data.configs) {
    return response.data.configs.value.split(",");
  }

  return ["promptpay", "card"];
}

export async function createCheckoutSession({
  priceId,
  code,
}: {
  priceId: string;
  code: string;
}) {
  const origin = await getOrigin();
  const paymentMethods = await getPaymentMethod(origin);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: paymentMethods,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}`,
    metadata: {
      code, // ใช้ดึงข้อมูลกลับในหน้าสำเร็จแบบปลอดภัย
    },
  });

  redirect(session.url!);
}
