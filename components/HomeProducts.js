import ProductBox from "./ProductBox";

export default function HomeProducts({ newProducts }) {
  return (
    <div className="px-40 py-4">
      <h1 className="text-2xl mt-10">New Arrivals</h1>
      <div className="mt-4 grid grid-cols-3 gap-10 ">
        {newProducts?.length > 0 &&
          newProducts.map((product) => (
            <div className="" key={product._id}>
              <ProductBox {...product} />
            </div>
          ))}
      </div>
    </div>
  );
}
