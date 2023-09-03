import Layout from "@/components/Layout";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Products({ products }) {
  return (
    <Layout>
      <div className="px-40 py-4">
        <h1 className="text-2xl mt-10">New Arrivals</h1>
        <div className="mt-4 grid grid-cols-3 gap-10 ">
          {products?.length > 0 &&
            products.map((product) => (
              <div className="" key={product._id}>
                <ProductBox {...product} />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
