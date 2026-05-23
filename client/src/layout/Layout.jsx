import Footer from "./Footer";
import Navbar from "./Nav";


function Layout({
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto p-5 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;