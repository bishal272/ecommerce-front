import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { withSwal } from "react-sweetalert2";
import { CartContext } from "./CartContext";

function ProductBox({ _id, title, description, price, images, swal }) {
  const { addProduct } = useContext(CartContext);
  const { data: session } = useSession();
  function addProductToCart() {
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
      addProduct(_id);
    }
  }
  return (
    <div className="drop-shadow-lg">
      <Link
        href={"/product/id?=" + _id}
        className="p-6 rounded-md shadow-inner bg-gray-200 flex items-center justify-center">
        <img
          src={images[0]}
          alt=""
          className="max-w-full max-h-44 hover:drop-shadow-2xl transition-all hover:scale-105"
        />
      </Link>
      <div className="my-2 font-bold text-lg">
        <Link href={"/"}>{title}</Link>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xl">₹{price}</span>

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
        <button
          className="gap-1 border border-gray-200 text-black flex rounded-md py-1 px-2 shadow-sm btn-ani"
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
  );
}
export default withSwal(({ swal, ...rest }, ref) => <ProductBox {...rest} swal={swal} />);
