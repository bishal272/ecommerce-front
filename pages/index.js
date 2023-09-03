import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useSession } from "next-auth/react";

export default function index({ featuredProduct, newProducts }) {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="md:pl-40 md:pr-20 px-12 bg-black pt-5">
        <Hero product={featuredProduct} />
      </div>
      <HomeProducts newProducts={newProducts} />
    </Layout>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();
  // const heroProduct = "64f202acccdea741adeeffaf";
  const ids = await Product.find({});
  const idsArr = ids.map((i) => i._id.toString());
  const featuredProduct = await Product.findById(idsArr[Math.floor(Math.random() * idsArr.length)]);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
