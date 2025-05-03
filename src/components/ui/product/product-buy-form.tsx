"use client";

import { checkoutAction } from "@/lib/actions";
import { useActionState } from "react";
import { 
  useCodeStore, 
  useValidateCodeStore,
} from "@/store/codeStore";

export function ProductBuyForm({ priceId, priceDefualt }: { priceId: string, priceDefualt?: number }) {
  const [, formAction, isPending] = useActionState(checkoutAction, null);
  const { code } = useCodeStore();
  const { validate } = useValidateCodeStore();

  return (
    <form action={formAction}>
      <input type="hidden" name="priceId" value={priceId} />
      <input type="hidden" name="code" value={code} />
      <button type="submit"  className={`btn btn-sm rounded-full font-normal text-[14px] px-6`} disabled={isPending || (!validate || (priceDefualt ?? 0) < 10)} >
        {isPending ? "Please wait" : "ซื้อเลย"}
      </button>
    </form>
  );
}
