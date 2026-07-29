import { FaWhatsapp, FaPizzaSlice } from "react-icons/fa";

import logo from "../../../assets/images/logo.png";
import background from "../../../assets/images/pizza-background.png";

import { buildWhatsAppLink } from "../../../utils/whatsapp";

import "./Hero.css";

function Hero() {
  const whatsappLink = buildWhatsAppLink(
    "Olá! Gostaria de solicitar um orçamento para o rodízio da Gama Pizzas.",
  );

  return (
    <section className="hero" id="inicio">
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <img src={logo} alt="Gama Pizzas" className="hero-logo" />

        <div className="hero-badge">
          <FaPizzaSlice />

          <span>Rodízio de Pizzas</span>
        </div>

        <h1>
          O sabor que reúne
          <br />
          família e amigos
        </h1>

        <p>
          Levamos a experiência da Gama Pizzas até o seu evento com pizzas
          artesanais, estrutura completa e sabores incríveis.
        </p>

        <div className="hero-actions">
          <a href="#rodizios" className="hero-button primary">
            Conhecer Rodízios
          </a>

        
        </div>
      </div>
    </section>
  );
}

export default Hero;
