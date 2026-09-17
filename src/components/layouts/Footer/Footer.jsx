import { FaInstagram } from "react-icons/fa";

import logo from "../../../assets/images/logo.png";

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

          <p>
            📞 <a href="tel:+5544999316666">(44) 99931-6666</a>
          </p>

          <p>
            📞 <a href="tel:+5543999772984">(43) 99977-2984</a>
          </p>
        </div>

        {/* REDES */}

        <div className="footer-social">
          <h3>Redes Sociais</h3>

          <div>
            <a
              href="https://www.instagram.com/gamapizzas.gm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Gama Pizzas"
            >
              <FaInstagram />
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
