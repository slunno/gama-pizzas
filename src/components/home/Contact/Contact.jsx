import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import "./Contact.css";

function Contact() {
  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-content" data-aos="fade-right">
          <span className="contact-badge">
            <FaCalendarAlt /> Orçamento Rápido & Sem Compromisso
          </span>

          <h2>Vamos combinar a pizza do seu evento?</h2>

          <p className="contact-desc">
            Aniversário, casamento, confraternização de empresa ou reunião em família:
            informe a data estimada, a cidade e o número de convidados. Nós montamos a proposta
            ideal em poucos minutos.
          </p>

          <div className="booking-steps">
            <div className="step-item">
              <span className="step-num">1</span>
              <span>Envie a data e local</span>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <span className="step-num">2</span>
              <span>Escolha o cardápio</span>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <span className="step-num">3</span>
              <span>Receba a proposta</span>
            </div>
          </div>

          <div className="contact-buttons">
            <a
              href={buildWhatsAppLink(
                "Olá! Gostaria de solicitar um orçamento para o rodízio da Gama Pizzas no meu evento.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp"
            >
              <FaWhatsapp /> Falar no WhatsApp Agora
            </a>

            <a
              href="https://www.instagram.com/gamapizzas.gm/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-instagram"
            >
              <FaInstagram /> Seguir no Instagram
            </a>
          </div>
        </div>

        <div className="contact-info-grid" data-aos="fade-left">
          <div className="info-card">
            <div className="info-icon">
              <FaPhoneAlt />
            </div>
            <div className="info-details">
              <h3>Fale por Telefone</h3>
              <p>
                <a href="tel:+5544999316666">(44) 99931-6666</a>
              </p>
              <p>
                <a href="tel:+5543999772984">(43) 99977-2984</a>
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaClock />
            </div>
            <div className="info-details">
              <h3>Horário de Atendimento</h3>
              <p>Segunda a Domingo: 08h às 22h</p>
              <span className="info-status">🟢 Respondemos rapidamente</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
