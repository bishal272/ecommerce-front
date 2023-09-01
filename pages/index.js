import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function index({ featuredProduct, newProducts }) {
  return (
    <Layout>
      <div className="pl-40 pr-20 bg-black pt-5">
        <Hero product={featuredProduct} />
      </div>
      <HomeProducts newProducts={newProducts} />
    </Layout>
  );
}
export async function getServerSideProps() {
  const heroProduct = "64f202acccdea741adeeffaf";
  await mongooseConnect();
  const featuredProduct = await Product.findById(heroProduct);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
