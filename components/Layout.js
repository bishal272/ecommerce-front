import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="w-screen h-screen ">
      <Header />
      <div>{children}</div>
    </div>
  );
}
