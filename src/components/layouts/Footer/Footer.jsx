import { FaInstagram, FaFacebook } from "react-icons/fa";

import logo from "../../../assets/images/logo.png";
import SectionTitle from "../SectionTitle/SectionTitle";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LOGO */}

        <div className="footer-brand">
          <img src={logo} alt="Gama Pizzas" />

          <p>
            Rodízio de pizzas para eventos, levando sabor e experiências
            inesquecíveis até você.
          </p>
        </div>

        {/* LINKS */}

        <div className="footer-links">
          <h3>Navegação</h3>

          <a href="#inicio">Início</a>

          <a href="#historia">História</a>

          <a href="#rodizios">Rodízios</a>

          <a href="#galeria">Galeria</a>

          <a href="#contato">Contato</a>
        </div>

        {/* CONTATO */}

        <div className="footer-contact">
          <h3>Contato</h3>

          <p>📞 (44) 99931-6666</p>

          <p>📞 (43) 99977-2984</p>
        </div>

        {/* REDES */}

        <div className="footer-social">
          <h3>Redes Sociais</h3>

          <div>
            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()}
        Gama Pizzas. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;
