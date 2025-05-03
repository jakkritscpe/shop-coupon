"use client";
import type { z } from "zod";
import Image from "next/image";
import type { productSchema } from "@/lib/schema";
import { ProductBuyForm } from "@/components/ui/product/product-buy-form";
import { useValidateCodeStore } from "@/store/codeStore";

export function ProductListThumbnail({
  product,
}: {
  product: z.infer<typeof productSchema>;
}) {
  const { validate } = useValidateCodeStore();

  const priceNumber = parseFloat(product.price.display_amount?.replace(/[^0-9.]/g, "") ?? "0");

  return (
    <div
      className={`card card-compact bg-base-100 shadow-xl transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 ${
        (!validate || priceNumber < 10) && "cursor-not-allowed"
      }`}
    >
      <figure>
        <Image
          src={product.images?.[0] ?? "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className={`object-cover w-full h-48`}
        />
      </figure>

      <div className="card-body">
        <h2 className={`card-title ${ !validate || priceNumber < 10 && "text-gray-400" }`}>{product.name}</h2>
        <p className={`text-muted-foreground mb-4 ${ !validate || priceNumber < 10 && "text-gray-400" }`}>{product.description}</p>
        <div className="card-actions justify-between">
          <p className={`text-muted-foreground ${ !validate || priceNumber < 10 && "text-gray-400" }`}>
            {product.price.display_amount}
          </p>
          <ProductBuyForm priceId={product.price.id} priceDefualt={priceNumber} />
        </div>
      </div>
    </div>
  );
}

export function ProductListThumbnailSkeleton() {
  return <div className="bg-muted aspect-square rounded-xl" />;
}
