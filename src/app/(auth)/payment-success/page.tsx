import { redirect } from "next/navigation";
import Stripe from "stripe";
import Image from "next/image";
import ClientCopyButton from "@/components/ui/client-copy/ClientCopyButton";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  if (!sessionId) {
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

  // เช็คว่าดูแล้วหรือยัง
  if (session.payment_status !== "paid" || session.metadata?.viewed === "true") {
    redirect("/");
    return null;
  }

  // อัปเดต metadata ว่าใช้แล้ว
  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...session.metadata,
        viewed: "true",
      },
    });
  } catch (error) {
    console.error("Error marking session viewed:", error);
    redirect("/");
    return null;
  }

  const code = session.metadata?.code || "N/A";
  const finalCode = String(Number(code) * 5);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div>
          <Image src="/success.svg" alt="Success" width={60} height={60} />
        </div>
        <h1 className="text-2xl font-bold">Payment Success</h1>
        <p className="text-base text-gray-500">Thank you for your purchase!</p>
        <hr className="w-full my-2" />
        <p className="text-base text-gray-500">
          Your code is:{" "}
          <span className="badge badge-lg font-mono">{finalCode}</span>
        </p>
        <ClientCopyButton code={finalCode} />
      </div>
    </div>
  );
}