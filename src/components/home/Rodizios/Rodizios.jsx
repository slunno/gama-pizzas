import { useState } from "react";
import { flavors } from "../../../data/FlavorsData";
import "./Rodizios.css";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import {
  FaPizzaSlice,
  FaHamburger,
  FaUsers,
  FaChild,
  FaCheck,
  FaWhatsapp,
  FaFire,
  FaStar,
} from "react-icons/fa";

const menus = [
  {
    id: 1,
    title: "Rodízio Tradicional",
    subtitle: "Cardápio 1 — 20 Sabores",
    icon: <FaPizzaSlice />,
    price: "55",
    child: "27",
    features: [
      "14 sabores de pizzas salgadas",
      "6 sabores de pizzas doces",
      "Forno profissional levado ao local",
      "Pizzaiolo e preparo 100% ao vivo",
      "Pratos e guardanapos descartáveis inclusos",
    ],
    minimum: "Mínimo 30 pessoas ou R$ 1.650",
    highlight: false,
    tag: "Econômico",
  },
  {
    id: 2,
    title: "Rodízio Completo",
    subtitle: "Cardápio 2 — 30 Sabores",
    icon: <FaPizzaSlice />,
    price: "60",
    child: "30",
    features: [
      "21 sabores salgados (inclui Pepperoni e Parma)",
      "9 sabores doces (Sensação, Banoffee, M&M's)",
      "Forno profissional e equipe completa",
      "Fartura contínua do início ao fim",
      "Pratos e descartáveis inclusos",
    ],
    minimum: "Mínimo 25 pessoas ou R$ 1.500",
    highlight: true,
    tag: "Mais Escolhido",
  },
  {
    id: 3,
    title: "Pizza + Mini Burguer",
    subtitle: "Cardápio 1 — 20 Sabores + Lanches",
    icon: <FaHamburger />,
    price: "60",
    child: "30",
    features: [
      "20 sabores de pizzas artesanais",
      "Mini hambúrguer artesanal à vontade",
      "Batata frita quentinha e crocante",
      "Perfeito para festas infantis e adultos",
      "Equipe completa no local",
    ],
    minimum: "Mínimo 30 pessoas ou R$ 1.800",
    highlight: false,
    tag: "Combo Família",
  },
  {
    id: 4,
    title: "Combo Master",
    subtitle: "Cardápio 2 — 30 Sabores + Lanches",
    icon: <FaHamburger />,
    price: "65",
    child: "33",
    features: [
      "30 sabores de pizzas artesanais completas",
      "Mini hambúrguer artesanal ilimitado",
      "Batata frita servida na hora",
      "A experiência mais farta e elogiada",
      "Equipe dedicada e estrutura premium",
    ],
    minimum: "Mínimo 25 pessoas ou R$ 1.625",
    highlight: true,
    tag: "Experiência VIP",
  },
  {
    id: 5,
    title: "Festival de Hambúrguer",
    subtitle: "Apenas Lanches & Petiscos",
    icon: <FaHamburger />,
    price: "55",
    child: "27",
    features: [
      "Mini hambúrguer gourmet artesanal",
      "Mini hot dog especial",
      "Batata frita à vontade",
      "Mini churros quentinhos com doce de leite",
      "Ideal para aniversários e confraternizações",
    ],
    minimum: "Consulte condições para seu evento",
    highlight: false,
    tag: "Especial Lanches",
  },
];

function Rodizios() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState("menu2");

  const currentMenu = flavors[selectedMenu] || flavors.menu2;

  const getFilteredSalty = () => {
    if (activeFilter === "sweet") return [];
    return currentMenu.salty;
  };

  const getFilteredSweet = () => {
    if (activeFilter === "salty") return [];
    return currentMenu.sweet;
  };

  return (
    <section className="rodizios" id="rodizios">
      <div className="rodizios-container">
        {/* CABEÇALHO */}
        <div className="section-header" data-aos="fade-up">
          <span className="rodizios-badge">
            <FaFire /> Cardápios para Eventos
          </span>
          <h2>Escolha o formato perfeito para celebrar</h2>
          <p>
            Levamos toda a estrutura até seu salão, chácara ou casa: forno de alta temperatura,
            ingredientes selecionados, pizzaiolos e descartáveis. Você só aproveita seus convidados.
          </p>
        </div>

        {/* GRID DOS PACOTES */}
        <div className="menu-grid">
          {menus.map((menu) => (
            <div
              className={`menu-card ${menu.highlight ? "highlight" : ""}`}
              key={menu.id}
              data-aos="fade-up"
            >
              {menu.tag && (
                <div className="badge">
                  {menu.highlight && <FaStar />} {menu.tag}
                </div>
              )}

              <div className="menu-icon">{menu.icon}</div>

              <div className="menu-titles">
                <h3>{menu.title}</h3>
                <span className="menu-subtitle">{menu.subtitle}</span>
              </div>

              <div className="price">
                <span className="currency">R$</span>
                <span className="amount">{menu.price}</span>
                <small>,00 / adulto</small>
              </div>

              <div className="child-price">
                <FaChild /> Criança: <strong>R$ {menu.child},00</strong> (até 5 anos não paga)
              </div>

              <div className="features-list">
                {menu.features.map((feat, i) => (
                  <div className="feature-row" key={i}>
                    <FaCheck className="check-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="minimum-info">
                <FaUsers />
                <span>{menu.minimum}</span>
              </div>

              <a
                href={buildWhatsAppLink(
                  `Olá! Gostaria de consultar a disponibilidade do ${menu.title} (${menu.subtitle}) para o meu evento.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-card-button"
              >
                <FaWhatsapp /> Solicitar Orçamento
              </a>
            </div>
          ))}
        </div>

        {/* SEÇÃO DE SABORES INTERATIVA */}
        <div className="flavors-section" data-aos="fade-up">
          <div className="flavors-header">
            <span className="rodizios-badge">
              <FaPizzaSlice /> Seleção de Sabores
            </span>
            <h2>O que sai do nosso forno na sua festa</h2>
            <p>
              Massa de fermentação lenta, queijo de verdade e recheios generosos.
              Veja os sabores disponíveis para cada cardápio:
            </p>

            {/* SELETOR DE CARDÁPIO (20 ou 30 sabores) */}
            <div className="menu-selector-tabs">
              <button
                className={`menu-tab ${selectedMenu === "menu1" ? "active" : ""}`}
                onClick={() => setSelectedMenu("menu1")}
              >
                Cardápio 1 (20 Sabores)
              </button>
              <button
                className={`menu-tab ${selectedMenu === "menu2" ? "active" : ""}`}
                onClick={() => setSelectedMenu("menu2")}
              >
                Cardápio 2 (30 Sabores — Completo)
              </button>
            </div>

            {/* FILTROS DE CATEGORIA (Todas / Salgadas / Doces) */}
            <div className="flavor-category-pills">
              <button
                className={`pill-btn ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                Todos os Sabores
              </button>
              <button
                className={`pill-btn ${activeFilter === "salty" ? "active" : ""}`}
                onClick={() => setActiveFilter("salty")}
              >
                🍕 Apenas Salgadas ({currentMenu.salty.length})
              </button>
              <button
                className={`pill-btn ${activeFilter === "sweet" ? "active" : ""}`}
                onClick={() => setActiveFilter("sweet")}
              >
                🍫 Apenas Doces ({currentMenu.sweet.length})
              </button>
            </div>
          </div>

          <div className="flavors-container-box">
            {getFilteredSalty().length > 0 && (
              <div className="flavors-group">
                <h3>🍕 Pizzas Salgadas</h3>
                <div className="chips">
                  {getFilteredSalty().map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {getFilteredSweet().length > 0 && (
              <div className="flavors-group">
                <h3>🍫 Pizzas Doces</h3>
                <div className="chips">
                  {getFilteredSweet().map((item) => (
                    <span key={item} className="chip sweet">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rodizios;
