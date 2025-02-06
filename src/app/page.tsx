import { ProductList } from "@/components/ui/product/product-list";
import EnterCode from "@/components/ui/enter-code/enter-code";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-8">
      <h1 className="font-semibold text-left text-lg">ขั้นตอนที่ 1</h1>
      <EnterCode />
      <div className="divider"></div>
      <h1 className="font-semibold text-left text-lg">ขั้นตอนที่ 2</h1>
      {!products ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <ProductList list={products} />
      )}
    </div>
  );
}
