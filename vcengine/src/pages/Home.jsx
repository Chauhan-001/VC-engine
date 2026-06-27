import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import ToolGrid from "../components/home/ToolGrid";
import Features from "../components/home/Features";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ToolGrid />
        <Features />
      </main>

      <Footer />
    </>
  );
}

export default Home;