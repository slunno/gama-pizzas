import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaImages, FaInstagram } from "react-icons/fa";
import "./Gallery.css";

import massaNoAr from "../../../assets/images/registros/pizzaiolo-massa-no-ar.jpeg";
import pizzaDoce from "../../../assets/images/registros/pizza-doce-preparo.jpeg";
import massaArtesanal from "../../../assets/images/registros/massa-artesanal.jpeg";
import pizzaGama from "../../../assets/images/registros/pizza-da-gama.jpeg";

const photos = [
  {
    id: "massa-no-ar",
    image: massaNoAr,
    alt: "Pizzaiolo da Gama lançando a massa de pizza no ar",
    title: "Um pouco de farinha. Muito cuidado.",
    description: "É nas mãos do nosso pizzaiolo que tudo começa. Um registro do preparo que acontece antes de cada fatia chegar à mesa.",
    label: "A arte do preparo",
    category: "Bastidores",
    filters: ["bastidores"],
    width: 1066,
    height: 1600,
  },
  {
    id: "pizza-gama",
    image: pizzaGama,
    alt: "Pizza salgada da Gama com tomate, azeitonas e abobrinha, ao lado dos ingredientes",
    title: "Cor, sabor e vontade de repetir.",
    description: "Ingredientes, texturas e aquele encontro de sabores. A pizza pronta, do jeito que a gente gosta de compartilhar.",
    label: "Sabores da Gama",
    category: "Sabores",
    filters: ["sabores"],
    width: 853,
    height: 1280,
  },
  {
    id: "pizza-doce",
    image: pizzaDoce,
    alt: "Pizzaiolo da Gama finalizando uma pizza de chocolate com granulado",
    title: "O lado doce dos bons encontros.",
    description: "Chocolate, granulado e atenção aos detalhes. Um olhar de perto para a finalização da nossa pizza doce.",
    label: "Uma pausa para o doce",
    category: "Sabores · Bastidores",
    filters: ["sabores", "bastidores"],
    width: 1066,
    height: 1600,
  },
  {
    id: "massa-artesanal",
    image: massaArtesanal,
    alt: "Pizzaiolo da Gama abrindo a massa artesanal com as mãos na bancada",
    title: "Feita à mão, do começo ao fim.",
    description: "Cada movimento faz parte do preparo. Aqui, você acompanha um pouco do cuidado por trás das nossas pizzas.",
    label: "Mãos na massa",
    category: "Bastidores",
    filters: ["bastidores"],
    width: 1066,
    height: 1600,
  },
];

const filters = [
  { id: "todos", label: "Todos" },
  { id: "bastidores", label: "Bastidores" },
  { id: "sabores", label: "Sabores" },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [activePhotoId, setActivePhotoId] = useState(photos[0].id);
  const visiblePhotos = photos.filter(
    (photo) => activeFilter === "todos" || photo.filters.includes(activeFilter),
  );
  const activeIndex = visiblePhotos.findIndex((photo) => photo.id === activePhotoId);
  const activePhoto = visiblePhotos[activeIndex];

  const selectFilter = (filterId) => {
    setActiveFilter(filterId);
    setActivePhotoId(
      photos.find((photo) => filterId === "todos" || photo.filters.includes(filterId)).id,
    );
  };

  const changePhoto = (step) => {
    const nextIndex = (activeIndex + step + visiblePhotos.length) % visiblePhotos.length;
    setActivePhotoId(visiblePhotos[nextIndex].id);
  };

  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="gallery-container">
        <div className="gallery-header">
          <div>
            <span className="gallery-badge">
              <FaImages aria-hidden="true" /> Registros & Sabores
            </span>
            <h2 id="gallery-title">De perto, tudo tem<br />mais sabor.</h2>
          </div>
          <p>
            Da massa no ar à última pitada de chocolate. Conheça os sabores
            e os bastidores da Gama pelas nossas fotos.
          </p>
        </div>

        <div className="gallery-menu" role="group" aria-label="Filtrar fotos">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              className={`gallery-filter${activeFilter === filter.id ? " gallery-filter--active" : ""}`}
              aria-pressed={activeFilter === filter.id}
              aria-controls="gallery-album"
              onClick={() => selectFilter(filter.id)}
            >
              {filter.label}
              <span className="gallery-filter-count">
                {photos.filter((photo) => filter.id === "todos" || photo.filters.includes(filter.id)).length}
              </span>
            </button>
          ))}
          <span className="gallery-menu-note">Um olhar para a nossa cozinha</span>
        </div>

        <div
          className="gallery-album"
          id="gallery-album"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Fotos da Gama Pizzas"
        >
          <figure className="gallery-featured">
            <img
              key={activePhoto.id}
              src={activePhoto.image}
              alt={activePhoto.alt}
              width={activePhoto.width}
              height={activePhoto.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{activePhoto.category}</figcaption>
          </figure>

          <div className="gallery-details">
            <div className="gallery-photo-copy" aria-live="polite" aria-atomic="true">
              <span className="gallery-photo-kicker">Dentro da Gama</span>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.description}</p>
            </div>

            <div className="gallery-controls">
              <span className="gallery-counter" aria-label={`Foto ${activeIndex + 1} de ${visiblePhotos.length}`}>
                <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
                <span aria-hidden="true"> / </span>
                {String(visiblePhotos.length).padStart(2, "0")}
              </span>
              <div className="gallery-arrows">
                <button type="button" onClick={() => changePhoto(-1)} aria-label="Foto anterior" aria-controls="gallery-album">
                  <FaArrowLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={() => changePhoto(1)} aria-label="Próxima foto" aria-controls="gallery-album">
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="gallery-photo-menu">
              <p>Escolha um registro</p>
              <div className="gallery-thumbnails" role="group" aria-label="Escolher foto">
                {visiblePhotos.map((photo) => (
                  <button
                    type="button"
                    key={photo.id}
                    className={`gallery-thumbnail${activePhotoId === photo.id ? " gallery-thumbnail--active" : ""}`}
                    onClick={() => setActivePhotoId(photo.id)}
                    aria-label={`Ver foto: ${photo.label}`}
                    aria-pressed={activePhotoId === photo.id}
                    aria-controls="gallery-album"
                  >
                    <span className="gallery-thumbnail-image">
                      <img src={photo.image} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                    </span>
                    <span className="gallery-thumbnail-label">{photo.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="gallery-footer-cta">
          <p>Mais sabores, bastidores e bons momentos por lá.</p>
          <a
            href="https://www.instagram.com/gamapizzas.gm/"
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-insta-btn"
          >
            <FaInstagram aria-hidden="true" /> Acompanhe a Gama <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
