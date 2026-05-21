import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ReactPackageSection from "@/components/ReactPackageSection";
import ExtensionSection from "@/components/ExtensionSection";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ReactPackageSection />
        <ExtensionSection />
      </main>
      <Footer />
    </>
  );
};

export default Page;
