import { ProductList } from "@/components/ui//product/product-list";
import { getProducts } from "@/lib/products";


export default async function HomePage() {
const products = await getProducts();
  return (
        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-8">
          <h1 className="font-semibold text-left text-lg">ขั้นตอนที่ 1</h1>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">กรุณากรอกรหัส ?</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </div>
            <input
              type="text"
              placeholder="code"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label">
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </div>
          </label>
          <div className="divider"></div>
          <h1 className="font-semibold text-left text-lg">ขั้นตอนที่ 2</h1>
          {!products ? (
            <span className="loading loading-bars loading-lg"></span>
          ) : (
            <ProductList list={products} />
          )}
          {/* <div className="divider"></div> */}
        </div>
  );
}
