import { FaWhatsapp, FaPizzaSlice } from "react-icons/fa";

import logo from "../../../assets/images/logo.png";

import "./Hero.css";


function Hero() {


    const whatsappNumber = "5543999999999";


    const message = encodeURIComponent(
        "Olá! Gostaria de conhecer o rodízio da Gama Pizza."
    );


    return (

        <section className="hero">

            
            <div className="hero-background"></div>


            <div className="hero-overlay"></div>


            <div className="hero-content">

                <img 
                  src={logo}
                  alt="Gama Pizza"
                  className="hero-logo"
                />
                
                <div className="hero-badge">

                    <FaPizzaSlice />

                    <span>
                        Rodízio de Pizzas
                    </span>

                </div>



                <h1>

                    O sabor que reúne
                    <br />

                    família e amigos

                </h1>



                <p>

                    Uma experiência completa com
                    pizzas artesanais, ambiente agradável
                    e sabores para todos os momentos.

                </p>



                <div className="hero-actions">


                    <a
                        href="#rodizios"
                        className="hero-button primary"
                    >

                        Conhecer Rodízios

                    </a>



                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-button whatsapp"
                    >

                        <FaWhatsapp />

                        WhatsApp

                    </a>


                </div>


            </div>


        </section>

    );

}


export default Hero;