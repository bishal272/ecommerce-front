import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full bg-white">
      <Header />
      <div>{children}</div>
      <footer className="text-center mt-14">Made with ❤️ by Bishal</footer>
    </div>
  );
}
