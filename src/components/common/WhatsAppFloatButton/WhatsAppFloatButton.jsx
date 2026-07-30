import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import "./WhatsAppFloatButton.css";

const CONTACT_SECTION_ID = "contato";
const OBSERVER_THRESHOLD = 0.15;

function WhatsAppFloatButton() {
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById(CONTACT_SECTION_ID);

    // Se a seção de contato não existir na página atual, o botão
    // permanece sempre visível (comportamento padrão).
    if (!contactSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: OBSERVER_THRESHOLD },
    );

    observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={buildWhatsAppLink("Olá, gostaria de fazer um orçamento!")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="fale conosco no Whatsapp"
      aria-hidden={isContactVisible}
      tabIndex={isContactVisible ? -1 : 0}
      className={`whatsapp-float-button${
        isContactVisible ? " whatsapp-float-button--hidden" : ""
      }`}
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppFloatButton;
