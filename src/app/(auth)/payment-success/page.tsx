import { redirect } from "next/navigation";
import Stripe from "stripe";
import Image from "next/image";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

// In-memory Set to track used sessions (Note: This resets when server restarts)
const usedSessionIds = new Set<string>();

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  if (!sessionId || usedSessionIds.has(sessionId)) {
    redirect("/");
    return null;
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("Error retrieving session:", error);
    redirect("/");
    return null;
  }

  if (session.payment_status !== "paid") {
    redirect("/");
    return null;
  }

  // Mark session as used
  usedSessionIds.add(sessionId);

  const code = session.metadata?.code || "N/A";
  const valueMultiple = 5;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="flex justify-center">
          <Image src="/success.svg" alt="Success" width={60} height={60} />
        </div>
        <h1 className="text-2xl font-bold mt-4">Payment Success</h1>
        <p className="text-base text-gray-500 mt-2">
          Thank you for your purchase!
        </p>
        <hr className="my-4" />
        <p className="text-base text-gray-500 mt-2">
          Your code is:{" "}
          <span className="badge badge-lg">
            {Number(code) * valueMultiple}
          </span>
        </p>
      </div>
    </div>
  );
}