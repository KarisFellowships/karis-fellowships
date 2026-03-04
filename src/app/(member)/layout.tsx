import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
