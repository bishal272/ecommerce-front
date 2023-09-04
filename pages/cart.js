import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
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
            <h1>Cart</h1>
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
                  <button className="btn-default mb-4" onClick={goToPayment}>
                    Continue to Payment
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
