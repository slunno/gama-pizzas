import Hero from "../../components/home/Hero/Hero.jsx";
import History from "../../components/home/History/History.jsx";
import Rodizios from "../../components/home/Rodizios/Rodizios.jsx";
import Gallery from "../../components/home/Gallery/Gallery.jsx";
import Contact from "../../components/home/Contact/Contact.jsx";

import "./Home.css";


function Home(){

    return(
        <div className="home">

            <section id="inicio">
                <Hero />
            </section>


            <section id="historia">
                <History />
            </section>


            <section id="rodizios">
                <Rodizios />
            </section>


            <section id="galeria">
                <Gallery />
            </section>


            <section id="contato">
                <Contact />
            </section>

        </div>
    );

}


export default Home;