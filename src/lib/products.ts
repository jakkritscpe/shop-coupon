import { productListSchema } from "@/lib/schema"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"
import axios from "axios"
import { getOrigin } from "@/lib/utils";

export async function getLimitItems(origin?: string) {
  const response = await axios.get(`${origin}/api/config?name=limitItems`);

  if (!response.data) {
    return 0;
  }

  if (response.data.configs) {
    return Number(response.data.configs.value);
  }

  return 0;
}

export async function getProducts(
  options?: Pick<Stripe.ProductListParams, "limit">
) {
  const origin = await getOrigin();
  const limit = options?.limit ?? await getLimitItems(origin);
  const products = await stripe.products.list({
    limit,
    active: true,
    expand: ["data.default_price"],
  });

  return productListSchema.parse({
    data: products.data.map((product) => {
      const price = product.default_price as Stripe.Price;
      const amount = price.unit_amount ? price.unit_amount / 100 : null;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        price: {
          id: price.id,
          amount,
          display_amount: amount?.toLocaleString("en-US", {
            style: "currency",
            currency: "THB",
          }),
        },
      };
    }),
    has_more: products.has_more,
    starting_after: products.data[products.data.length - 1]?.id,
  });
}
