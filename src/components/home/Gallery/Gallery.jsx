import "./Gallery.css";
import { FaImages, FaInstagram } from "react-icons/fa";

import pizzaMarguerita from "../../../assets/images/pizzas/marguerita.jpg";
import pizzaCalabresa from "../../../assets/images/pizzas/calabresa.jpg";
import pizzaQuatroQueijos from "../../../assets/images/pizzas/quatro-queijos.jpg";
import pizzaPepperoni from "../../../assets/images/pizzas/pepperoni.jpg";
import pizzaFrango from "../../../assets/images/pizzas/frango-catupiry.jpg";
import pizzaSensacao from "../../../assets/images/pizzas/sensacao.jpg";

function Gallery() {
  const items = [
    {
      image: pizzaCalabresa,
      title: "Calabresa Artesanal Acebolada",
      tag: "Mais Pedida",
    },
    {
      image: pizzaMarguerita,
      title: "Marguerita Tradicional",
      tag: "Clássica",
    },
    {
      image: pizzaQuatroQueijos,
      title: "Quatro Queijos Gratinada",
      tag: "Gourmet",
    },
    {
      image: pizzaPepperoni,
      title: "Pepperoni Importado Especial",
      tag: "Favorita",
    },
    {
      image: pizzaFrango,
      title: "Frango Desfiado com Catupiry",
      tag: "Especial",
    },
    {
      image: pizzaSensacao,
      title: "Sensação (Chocolate & Morango)",
      tag: "Doce Artesanal",
    },
  ];

  return (
    <section className="gallery" id="galeria">
      <div className="gallery-container">
        <div className="gallery-header" data-aos="fade-up">
          <span className="gallery-badge">
            <FaImages /> Registros & Sabores
          </span>
          <h2>Cada evento, uma história diferente</h2>
          <p>
            Um vislumbre das fatias artesanais que saem direto do nosso forno profissional para a
            mão dos seus convidados.
          </p>
        </div>

        <div className="gallery-grid">
          {items.map((item, index) => (
            <div
              className="gallery-card"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 80}
            >
              <div className="gallery-img-box">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="card-tag">{item.tag}</span>
              </div>

              <div className="gallery-card-info">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-footer-cta" data-aos="fade-up">
          <p>Quer ver mais fotos de rodízios e bastidores dos eventos?</p>
          <a
            href="https://www.instagram.com/gamapizzas.gm/"
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-insta-btn"
          >
            <FaInstagram /> Acompanhe no Instagram @gamapizzas.gm
          </a>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
