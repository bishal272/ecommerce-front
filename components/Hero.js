import { signIn, useSession } from "next-auth/react";
import { useContext } from "react";
import { withSwal } from "react-sweetalert2";
import { CartContext } from "./CartContext";

function Hero({ product, swal }) {
  const { data: session } = useSession();
  const { addProduct } = useContext(CartContext);
  function addHeroProductToCart() {
    if (!session) {
      swal
        .fire({
          title: "You are Not logged in",
          confirmButtonText: "Sign in with google",
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
    <div className=" bg-black text-white flex justify-center items-center gap-38 py-4">
      <div className="flex flex-col gap-10 ">
        <h1 className="text-5xl">{product.title}</h1>
        <p className="text-gray-400">{product.description}</p>
        <div className="flex gap-2">
          <button className="btn-default btn-ani">Read More</button>
          <button className="btn-primary flex gap-1 btn-ani" onClick={addHeroProductToCart}>
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
      <div className="flex justify-center items-">
        <div className="">
          <img src={product.images[0]} alt="" className="w-3/4 float-right" />
        </div>
      </div>
    </div>
  );
}
export default withSwal(({ swal, ...rest }, ref) => <Hero {...rest} swal={swal} />);
