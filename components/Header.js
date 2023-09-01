import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between bg-black text-white px-40 py-4">
      <Link href={"/"} className="text-2xl">
        Ecommerce
      </Link>
      <nav className="flex gap-7 text-gray-400 text-lg">
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>All products</Link>
        <Link href={"/categories"}>Categories</Link>
        <Link href={"/account"}>Account</Link>
        <Link href={"/"}>Cart(0)</Link>
      </nav>
    </div>
  );
}
