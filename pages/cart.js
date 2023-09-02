import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Cart() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  return (
    <Layout>
      <div className="pl-40 pr-20 pt-5 ">
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-10 ">
          <div className="bg-gray-200 w-full p-4 rounded-md min-h-[120]">
            {!cartProducts?.length && <div>Your cart is empty</div>}
            <h1 className="text-2xl font-bold pl-2">Cart</h1>
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
                          <img src={product.images[0]} alt="" className="max-w-full max-h-36 " />
                        </div>

                        {product.title}
                      </td>
                      <td>{cartProducts.filter((id) => id === product._id).length}</td>
                      <td>
                        {product.price * cartProducts.filter((id) => id === product._id).length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="bg-gray-200 rounded-md  relative max-h-72">
              <h1 className="text-xl font-bold text-center mt-4">Order Information</h1>
              <div className="w-full flex flex-col items-center justify-center gap-4 mt-4 border ">
                <input type="text" placeholder="Address" />
                <input type="text" placeholder="Pin code" />
              </div>

              <div className="w-full flex items-center justify-center bottom-4 absolute">
                <button className="btn-default ">Continue to Payment</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
