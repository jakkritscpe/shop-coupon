"use client";


import { useState } from "react";
import {
  ProductListThumbnail,
  ProductListThumbnailSkeleton,
} from "@/components/ui/product/product-list-thumbnail";
import type { productListSchema } from "@/lib/schema";
import type { z } from "zod";

export function ProductList({list}: {list: z.infer<typeof productListSchema>}) {

  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const uniqueNames = Array.from(new Set(list.data.map(product => product.name)));

  const handleFilter = (name: string) => {
    setSelectedFilter(name);
    console.log(uniqueNames);
  };

  return (
    <div className="relative mb-8 flex flex-col items-start gap-8">
      {list.data.length > 0 ? (
        <>
          <form className="filter flex justify-start items-center w-full">
            <input className="btn btn-sm rounded-full" type="reset" value="×" onClick={() => handleFilter("")} />
            {uniqueNames.map((name) => (
              <input
                className="btn btn-sm mx-1 my-0 rounded-full"
                type="radio"
                name="frameworks"
                aria-label={name}
                key={name}
                onClick={() => handleFilter(name)}
              />
            ))}
          </form>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {list.data
              .filter(product => !selectedFilter || product.name === selectedFilter)
              .map((product) => (
                <ProductListThumbnail key={product.id} product={product} />
              ))
            }
          </div>
          {/* <Button asChild size="sm" variant="outline">
            <Link href="#">View all products</Link>
          </Button> */}
        </>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-8 opacity-40 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductListThumbnailSkeleton key={index} />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-sm">
            <div className="font-medium">No products found.</div>
            <div className="text-muted-foreground mb-4">
              Add products to your store to get started.
            </div>
            {/* <Button asChild size="sm" variant="outline">
              <a href="https://dashboard.stripe.com/test/products" target="_blank" rel="noreferrer">
                Add Product
              </a>
            </Button> */}
            <button className="btn">
              {" "}
              <a
                href="https://dashboard.stripe.com/test/products"
                target="_blank"
                rel="noreferrer"
              >
                Add Product
              </a>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
