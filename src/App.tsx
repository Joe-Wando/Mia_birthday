import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrialsSection } from "./components/TrialsSection";
import { GrimoireSection } from "./components/GrimoireSection";
import { LorekeeperCorner } from "./components/LorekeeperCorner";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrialsSection />
        <GrimoireSection />
        <LorekeeperCorner />
      </main>
      <Footer />
    </>
  );
}

export default App;
