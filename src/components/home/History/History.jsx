import { FaArrowRight } from "react-icons/fa";
import massaArtesanal from "../../../assets/images/registros/massa-artesanal.jpeg";
import "./History.css";

function History() {
  return (
    <section className="history" id="historia" aria-labelledby="history-title">
      <div className="history-container">
        <div className="history-photo">
          <img
            src={massaArtesanal}
            alt="Pizzaiolo da Gama preparando a massa artesanal"
            width="1066"
            height="1600"
            loading="lazy"
            decoding="async"
          />
          <span className="history-photo-note">Gama Pizzas · Feita por pessoas</span>
        </div>

        <div className="history-content">
          <span className="history-badge">Nossa história</span>
          <h2 id="history-title">A história por trás<br />de cada fatia.</h2>
          <div className="history-placeholder">
            <span className="history-coming-soon">Em breve</span>
            <p>Um espaço para compartilhar as origens, as pessoas e os momentos que fazem parte da Gama.</p>
          </div>
          <a href="#contato" className="history-link">
            Faça parte dos nossos próximos momentos <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default History;
