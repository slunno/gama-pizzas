import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

import logo from "../../../assets/images/logo.png";
import { buildWhatsAppLink } from "../../../utils/whatsapp";
import "./NavBar.css";

const navigation = [
  ["Início", "#inicio"],
  ["Rodízios", "#rodizios"],
  ["Registros", "#galeria"],
  ["A Gama", "#historia"],
  ["Dúvidas", "#faq"],
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(() =>
    window.matchMedia("(max-width: 920px)").matches,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 920px)");
    const handleLayoutChange = (event) => setIsMenuCollapsed(event.matches);
    mediaQuery.addEventListener("change", handleLayoutChange);
    return () => mediaQuery.removeEventListener("change", handleLayoutChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="#inicio" className="navbar-brand" onClick={closeMenu}>
          <img src={logo} alt="" />
          <span>
            <strong>Gama Pizzas</strong>
            <small>Rodízio para eventos</small>
          </span>
        </a>

        <nav
          id="primary-navigation"
          className={`navbar-menu${menuOpen ? " navbar-menu--open" : ""}`}
          aria-label="Navegação principal"
          inert={!menuOpen && isMenuCollapsed}
        >
          {navigation.map(([label, href]) => (
            <a href={href} onClick={closeMenu} key={href}>
              {label}
            </a>
          ))}

          <a href="#contato" className="navbar-menu-contact" onClick={closeMenu}>
            Contato
          </a>
        </nav>

        <a
          href={buildWhatsAppLink(
            "Olá! Gostaria de consultar uma data para meu evento com a Gama Pizzas.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta"
        >
          <FaWhatsapp aria-hidden="true" />
          <span>Consultar data</span>
        </a>

        <button
          className="navbar-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="navbar-overlay"
          onClick={closeMenu}
          aria-label="Fechar menu"
        />
      )}
    </header>
  );
}

export default Navbar;
