import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex justify-between bg-black text-white md:px-40 px-12 py-7 md:py-4 w-full">
      <nav className="flex flex-col  md:items-center  text-gray-400 text-lg md:flex-row justify-between md:w-full gap-2">
        <div>
          <Link
            href={"/"}
            className="text-2xl text-white hover:text-gray-400 flex justify-center items-center gap-2">
            Ecommerce
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6">
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </Link>
        </div>
        <div
          className={
            showNav
              ? "flex flex-col gap-2   bg-black w-full text-white h-full transition-all left-0"
              : " gap-5 flex-col hidden lg:flex lg:flex-row"
          }>
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>All products</Link>
          <Link href={"/categories"}>Categories</Link>
          <Link href={"/account"}>Account</Link>
          <Link href={"/cart"}>Cart({cartProducts.length})</Link>
        </div>
      </nav>
      <div className="lg:hidden">
        <button onClick={() => setShowNav((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
