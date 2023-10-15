import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="h-full pt-40">{children}</main>
      <Footer />
    </>
  );
}
