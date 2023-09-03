import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { withSwal } from "react-sweetalert2";

function ProductPage({ product, swal }) {
  const [activeImage, setActiveImage] = useState(product?.images[0]);
  const { addProduct } = useContext(CartContext);
  const { data: session } = useSession();
  function addProductToCart() {
    if (!session) {
      swal
        .fire({
          title: "Log in to start shopping😊",
          confirmButtonText: "Sign in with google",
          cancelButtonText: "Cancel",
          showCancelButton: "True",
          cancelButtonColor: "#ff7f7f",
          confirmButtonColor: "#279EFF",
        })
        .then((result) => {
          // when confirmed and promise resolved...
          if (result.isConfirmed) {
            signIn("google");
          }
        });
    } else {
      addProduct(product._id);
    }
  }
  return (
    <Layout>
      <div className="md:pl-40 md:pr-20 pt-5 ">
        <div className="grid lg:grid-cols-[.6fr_1.2fr] gap-10 ">
          <div className="bg-gray-200 w-full p-7 rounded-2xl min-h-[120] flex items-center justify-center  flex-col gap-2">
            <div className="">
              <img src={activeImage} alt="" className="max-h-72" />
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr] grow-0">
              {product?.images.length > 0 &&
                product.images.map((image) => (
                  <div
                    key={image}
                    className="border border-gray-500 p-1"
                    onClick={() => setActiveImage(image)}>
                    <img src={image} alt="" className="w-80" />
                  </div>
                ))}
            </div>
          </div>
          <div className="p-6">
            <h1>{product.title}</h1>
            <p className="mt-5 text-slate-800">{product.description}</p>
            <div className="flex gap-20 mt-8 items-center">
              <div className="flex flex-col justify-start gap-2">
                <span className="flex text-sm items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                  Assured Delivery
                </span>
                <span className="text-xl font-bold">₹{product.price}</span>
              </div>
              <button
                className="gap-1 border border-gray-200 text-black flex rounded-md mt-7 py-1 px-2 shadow-sm btn-ani"
                onClick={addProductToCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default withSwal(({ swal, ...rest }, ref) => <ProductPage {...rest} swal={swal} />);
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
