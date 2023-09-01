import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="w-screen h-full bg-gray-200">
      <Header />
      <div>{children}</div>
    </div>
  );
}
