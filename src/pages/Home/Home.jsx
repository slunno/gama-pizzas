import Hero from "../../components/home/Hero/Hero.jsx";
import History from "../../components/home/History/History.jsx";
import Rodizios from "../../components/home/Rodizios/Rodizios.jsx";
import Gallery from "../../components/home/Gallery/Gallery.jsx";
import Contact from "../../components/home/Contact/Contact.jsx";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Hero />

      <History />

      <Rodizios />

      <Gallery />

      <Contact />
    </div>
  );
}

export default Home;
