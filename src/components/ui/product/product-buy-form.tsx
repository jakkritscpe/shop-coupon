"use client";

import { checkoutAction } from "@/lib/actions";
import { useActionState } from "react";

export function ProductBuyForm({ priceId }: { priceId: string }) {
  const [, formAction, isPending] = useActionState(checkoutAction, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="priceId" value={priceId} />

      <button type="submit"  className="btn btn-sm rounded-full font-normal text-[14px] px-6" disabled={isPending}>
        {isPending ? "Please wait" : "ซื้อเลย"}
      </button>
    </form>
  );
}
