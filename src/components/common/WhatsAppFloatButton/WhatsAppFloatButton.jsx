import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import "./WhatsAppFloatButton.css";

function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppLink("Olá, gostaria de fazer um orçamento!")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="fale conosco no Whatsapp"
      className="whatsapp-float-button"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppFloatButton;
