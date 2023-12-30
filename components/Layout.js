import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-w-screen min-h-screen bg-white ">
      <Header />
      <div>{children}</div>
      <footer className="text-center my-7">Made with ❤️ by Bishal</footer>
    </div>
  );
}
