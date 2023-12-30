import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Cart({ swal }) {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState();
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      clearCart();
      setIsSuccess(true);
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
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
      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        pinCode,
        streetAddress,
        country,
        cartProducts,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <Layout>
        <div className="lg:pl-24 lg:pr-20 pt-5 ">
          <div className="flex items-center justify-center ">
            <div className="bg-gray-200 w-96 p-7 mt-10 rounded-2xl min-h-[120] ">
              <h1>Thanks for your Order!</h1>
              <p className="mt-5">We will email you when your order is shipped.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="lg:pl-40 lg:pr-20 pt-5 ">
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
          <div className="bg-gray-200 w-full p-10 rounded-2xl min-h-[120]">
            <div className="flex items-center justify-between">
              <h1>Cart</h1>
              {!!cartProducts.length && (
                <button className="btn-red " onClick={clearCart}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7  bg-red-500 rounded-md p-1">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>

            {!cartProducts?.length && <div className="p-2">Your cart is empty</div>}
            {products?.length > 0 && (
              <table className="basic mt-5">
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Price</td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td className="p-6 rounded-md flex flex-col items-center justify-center">
                        <div>
                          <img src={product.images[0]} alt="" className="max-w-full max-h-32 " />
                        </div>

                        {product.title}
                      </td>
                      <td>
                        <button
                          className="rounded-sm  py-1 px-3 bg-gray-300 mr-2 "
                          onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </button>
                        {cartProducts.filter((id) => id === product._id).length}
                        <button
                          className="rounded-sm py-1 px-3 bg-gray-300 ml-2"
                          onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </button>
                      </td>
                      <td>
                        ₹{product.price * cartProducts.filter((id) => id === product._id).length}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td className="text-center">Total :</td>
                    <td className="font-bold">₹{total}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div>
              <div className="bg-gray-200 rounded-2xl  relative max-h-fit pt-10">
                <h1 className="text-center ">Order Information</h1>

                <div className="w-full flex flex-col items-center justify-center mt-4 border p-4">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Pin code"
                    name="pinCode"
                    value={pinCode}
                    onChange={(ev) => setPinCode(ev.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Street Address"
                    name="streetAddress"
                    value={streetAddress}
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={country}
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                </div>

                <div className="w-full flex items-center justify-center bottom-4 ">
                  <button
                    className="border-2 border-[#6A5FFF] mb-4 px-4 py-1 rounded-lg text-[#6A5FFF] font-medium"
                    onClick={goToPayment}>
                    Continue to Payment <br />
                    <div className="flex text-xs items-center justify-center">
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
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
                      Powered by <span className="font-bold pl-1">Stripe</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default withSwal(({ swal, ...rest }, ref) => <Cart {...rest} swal={swal} />);
