import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPause,
  FaPlay,
  FaWhatsapp,
} from "react-icons/fa";

import imgMarguerita from "../../../assets/images/pizzas/photographic/marguerita.webp";
import imgCalabresa from "../../../assets/images/pizzas/photographic/calabresa.webp";
import imgQuatroQueijos from "../../../assets/images/pizzas/photographic/quatro-queijos.webp";
import imgPepperoni from "../../../assets/images/pizzas/photographic/pepperoni.webp";
import imgFrango from "../../../assets/images/pizzas/photographic/frango-catupiry.webp";
import imgSensacao from "../../../assets/images/pizzas/photographic/sensacao.webp";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import "./Hero.css";

const pizzas = [
  { name: "Marguerita", image: imgMarguerita },
  { name: "Calabresa", image: imgCalabresa },
  { name: "Quatro queijos", image: imgQuatroQueijos },
  { name: "Pepperoni", image: imgPepperoni },
  { name: "Frango com catupiry", image: imgFrango },
  { name: "Sensação", image: imgSensacao },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreferenceChange = (event) => setPaused(event.matches);
    mediaQuery.addEventListener("change", handlePreferenceChange);
    return () => mediaQuery.removeEventListener("change", handlePreferenceChange);
  }, []);

  useEffect(() => {
    if (paused || hovered) return undefined;
    const timer = window.setInterval(
      () => setCurrent((index) => (index + 1) % pizzas.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [paused, hovered]);

  const changePizza = (step) => {
    setCurrent((index) => (index + step + pizzas.length) % pizzas.length);
  };

  const pizza = pizzas[current];

  return (
    <section className="hero" id="inicio">
      <div className="hero-container">
        <div className="hero-copy">
          <span className="hero-kicker">
            <FaMapMarkerAlt aria-hidden="true" />
            Londrina e região
          </span>

          <h1>
            Pizza saindo do forno.
            <span>A festa não para.</span>
          </h1>

          <p className="hero-description">
            Levamos forno, equipe e um rodízio artesanal completo até o seu evento.
            Você recebe seus convidados; a Gama cuida do resto.
          </p>

          <div className="hero-actions">
            <a href="#rodizios" className="button-primary">
              Ver cardápios
              <FaArrowDown aria-hidden="true" />
            </a>
            <a
              href={buildWhatsAppLink(
                "Olá! Gostaria de consultar uma data para meu evento com a Gama Pizzas.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              <FaWhatsapp aria-hidden="true" />
              Consultar data
            </a>
          </div>

          <dl className="hero-proof" aria-label="Números da Gama Pizzas">
            <div>
              <dt>1000+</dt>
              <dd>eventos realizados</dd>
            </div>
            <div>
              <dt>30</dt>
              <dd>sabores no cardápio</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>preparo no local</dd>
            </div>
          </dl>
        </div>

        <div
          className="hero-showcase"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="hero-image-shell" aria-live="polite">
            <img
              key={pizza.name}
              src={pizza.image}
              alt={`Pizza ${pizza.name} da Gama Pizzas`}
              className="hero-pizza-image"
              width="1254"
              height="1254"
              draggable="false"
            />
          </div>

          <div className="hero-showcase-copy">
            <span>Agora no forno</span>
            <h2>{pizza.name}</h2>
          </div>

          <div className="hero-pagination" role="group" aria-label="Escolher sabor em destaque">
            {pizzas.map((item, index) => (
              <button
                type="button"
                key={item.name}
                className={index === current ? "active" : ""}
                onClick={() => setCurrent(index)}
                aria-label={`Mostrar pizza ${item.name}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>

          <div className="hero-controls" role="group" aria-label="Controles do carrossel">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Retomar troca automática" : "Pausar troca automática"}
              aria-pressed={paused}
            >
              {paused ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => changePizza(-1)} aria-label="Sabor anterior">
              <FaChevronLeft />
            </button>
            <span>{String(current + 1).padStart(2, "0")}</span>
            <button type="button" onClick={() => changePizza(1)} aria-label="Próximo sabor">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      <a href="#historia" className="hero-scroll-cue">
        <span>Conheça a Gama</span>
        <FaArrowDown />
      </a>
    </section>
  );
}

export default Hero;
