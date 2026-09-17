import { useState } from "react";
import { FaChevronDown, FaQuestionCircle, FaWhatsapp, FaShieldAlt } from "react-icons/fa";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import pizzaPreview from "../../../assets/images/pizzas/marguerita.jpg";
import "./FAQ.css";

const faqData = [
  {
    question: "O que é necessário disponibilizar no local do evento?",
    answer:
      "Apenas um ponto de energia elétrica 220V e um espaço aproximado de 2x2 metros para montarmos nossa bancada e forno. Não usamos seu fogão, gás ou pia se você não quiser — trazemos tudo pronto e higienizado.",
  },
  {
    question: "Como funciona a cobrança para crianças?",
    answer:
      "Crianças de até 5 anos não pagam nada! De 6 a 10 anos pagam meia (R$ 27 a R$ 33, dependendo do cardápio escolhido). A partir de 11 anos conta como valor integral.",
  },
  {
    question: "Quanto tempo dura o atendimento do rodízio?",
    answer:
      "Nossa equipe chega com cerca de 1h30 de antecedência para montagem e aquecimento do forno. O serviço de rodízio contínuo dura em média 3 a 4 horas com fartura ininterrupta, garantindo que todos os convidados comam à vontade.",
  },
  {
    question: "Vocês levam pratos, talheres e descartáveis?",
    answer:
      "Sim! Levamos pratos descartáveis reforçados, guardanapos e suporte completo. Se o seu evento exigir pratos de louça ou talheres de inox, podemos incluir mediante consulta prévia.",
  },
  {
    question: "Quais cidades a Gama Pizzas atende?",
    answer:
      "Atendemos com frequência Londrina, Maringá, Cambé, Ibiporã, Rolândia, Arapongas e chácaras de toda a região. Para outras cidades do Paraná, consulte nossa taxa de deslocamento.",
  },
  {
    question: "Como funciona a reserva da data e pagamento?",
    answer:
      "Para garantir sua data na agenda, solicitamos um sinal de reserva. O saldo restante pode ser pago no dia do evento via Pix, dinheiro ou cartão de crédito parcelado.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* LADO ESQUERDO: CARD VISUAL INSPIRADO NO MOBIRISE */}
        <div className="faq-visual-card" data-aos="fade-right">
          <div className="faq-img-wrapper">
            <img src={pizzaPreview} alt="Gama Pizzas Rodízio" className="faq-img" />
            <div className="faq-img-badge">
              <FaShieldAlt />
              <span>Transparência Total</span>
            </div>
          </div>

          <div className="faq-cta-box">
            <h3>Ainda tem alguma dúvida?</h3>
            <p>Fale diretamente com nossa equipe. Respondemos em poucos minutos!</p>
            <a
              href={buildWhatsAppLink("Olá! Tenho uma dúvida sobre o rodízio da Gama Pizzas.")}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-whatsapp-btn"
            >
              <FaWhatsapp /> Tirar Dúvida no WhatsApp
            </a>
          </div>
        </div>

        {/* LADO DIREITO: ACCORDION DE DÚVIDAS */}
        <div className="faq-accordion-wrapper" data-aos="fade-left">
          <span className="faq-badge">
            <FaQuestionCircle /> Dúvidas Frequentes
          </span>
          <h2>Tudo o que você precisa saber antes de fechar</h2>
          <p className="faq-subtitle">
            Transparência e segurança para você planejar seu evento sem nenhuma surpresa.
          </p>

          <div className="accordion-list">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div className={`accordion-item ${isOpen ? "open" : ""}`} key={index}>
                  <button
                    className="accordion-header"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <FaChevronDown className={`chevron-icon ${isOpen ? "rotate" : ""}`} />
                  </button>

                  <div className={`accordion-body ${isOpen ? "expanded" : ""}`}>
                    <div className="accordion-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
