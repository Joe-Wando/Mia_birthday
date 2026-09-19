import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrialsSection } from "./components/TrialsSection";
import { LorekeeperCorner } from "./components/LorekeeperCorner";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrialsSection />
        <LorekeeperCorner />
      </main>
      <Footer />
    </>
  );
}

export default App;
