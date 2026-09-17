import { FaPizzaSlice, FaFire, FaUsers, FaCheckCircle, FaAward, FaCalendarCheck } from "react-icons/fa";
import "./History.css";
import pizzaImg from "../../../assets/images/pizza-background.png";

function History() {
  const highlights = [
    {
      icon: <FaPizzaSlice />,
      title: "Massa de Longa Fermentação",
      text: "Massa leve, arejada e de fácil digestão. Abrimos e recheamos cada pizza ao vivo na sua frente.",
    },
    {
      icon: <FaFire />,
      title: "Forno Próprio a 400°C",
      text: "Levamos nosso forno profissional de alta performance. Sem usar seu fogão e sem sujar sua cozinha.",
    },
    {
      icon: <FaUsers />,
      title: "Equipe e Fartura Contínua",
      text: "Pizzaiolos experientes e serviço ininterrupto: seus convidados comem à vontade do primeiro ao último minuto.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Estrutura Completa Inclusa",
      text: "Bancadas higienizadas, descartáveis e suporte total. O anfitrião curte a festa sem lavar uma única louça.",
    },
  ];

  const stats = [
    { number: "+500", label: "Eventos Realizados" },
    { number: "30+", label: "Sabores Artesanais" },
    { number: "100%", label: "Preparo ao Vivo" },
    { number: "5★", label: "Avaliação dos Clientes" },
  ];

  return (
    <section className="history" id="historia">
      <div className="history-container">
        {/* CABEÇALHO */}
        <div className="history-header" data-aos="fade-up">
          <span className="history-badge">
            <FaAward /> O Jeito Gama de Fazer Festa
          </span>
          <h2>Mais que pizzas, levamos a experiência de uma pizzaria para o seu evento</h2>
          <p>
            A Gama Pizzas nasceu de uma ideia simples: por que o anfitrião precisa se preocupar
            com cozinha ou a festa parar para todo mundo ir buscar comida? Nós montamos nossa
            estrutura completa no seu salão, chácara ou casa e servimos fatias quentinhas saindo
            do forno o tempo todo.
          </p>
        </div>

        {/* ESTATÍSTICAS / AUTORIDADE */}
        <div className="history-stats" data-aos="fade-up">
          {stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* GRID DE DIFERENCIAIS */}
        <div className="history-grid">
          <div className="history-image-wrapper" data-aos="fade-right">
            <img src={pizzaImg} alt="Pizza artesanal da Gama Pizzas" className="history-main-img" />
            <div className="history-image-overlay">
              <div className="image-overlay-badge">
                <FaCalendarCheck />
                <div>
                  <strong>Atendemos Londrina e Região</strong>
                  <p>Eventos corporativos, casamentos e aniversários</p>
                </div>
              </div>
            </div>
          </div>

          <div className="history-cards-wrapper" data-aos="fade-left">
            {highlights.map((item, index) => (
              <div className="history-feature-card" key={index}>
                <div className="feature-icon">{item.icon}</div>
                <div className="feature-text">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default History;
