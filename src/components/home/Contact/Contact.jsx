import { FaWhatsapp, FaInstagram, FaGoogle, FaPhone } from "react-icons/fa";

import { buildWhatsAppLink } from "../../../utils/whatsapp";

import "./Contact.css";

function Contact() {
  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-content" data-aos="fade-right">
          <span>Faça seu orçamento</span>

          <h2>Leve a experiência da Gama Pizzas para o seu evento</h2>

          <p>
            Aniversários, confraternizações, casamentos e eventos especiais. Nós
            levamos toda estrutura necessária para você aproveitar o melhor
            momento.
          </p>

          <div className="contact-buttons">
            <a
              href={buildWhatsAppLink(
                "Olá! Gostaria de solicitar um orçamento para o rodízio da Gama Pizzas.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp"
            >
              <FaWhatsapp />
              Solicitar orçamento
            </a>

            <a
              href="https://www.instagram.com/gamapizzas.gm/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-instagram"
            >
              <FaInstagram />
              Instagram
            </a>
          </div>
        </div>

        <div className="contact-info" data-aos="fade-left">
          <div className="info-card">
            <FaPhone />

            <div>
              <h3>Telefones</h3>

              <p>(44) 99931-6666</p>

              <p>(43) 99977-2984</p>
            </div>
          </div>

          <div className="info-card">
            <FaGoogle />

            <div>
              <h3>Avaliações</h3>

              <p>Confira nossos clientes no Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
