import { ProductBuyForm } from "@/components/ui/product/product-buy-form";
import type { productSchema } from "@/lib/schema";
import Image from "next/image";
import type { z } from "zod";

export function ProductListThumbnail({
  product,
}: {
  product: z.infer<typeof productSchema>;
}) {
  // console.log(product)

  return (
    <div className="card card-compact bg-base-100 shadow-xl transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2">
      <figure>
        <Image
          src={product.images?.[0] ?? "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover w-full h-48"
        />
      </figure>
      
      <div className="card-body">
        <h2 className="card-title"><Image src="/coupon.svg" alt="Line" width={40} height={40} /> {product.name}</h2>
        <p className="text-muted-foreground">{product.price.display_amount}</p>
        <div className="card-actions justify-end">
          <ProductBuyForm priceId={product.price.id} />
        </div>
      </div>
    </div>
  );
}

export function ProductListThumbnailSkeleton() {
  return <div className="bg-muted aspect-square rounded-xl" />;
}
