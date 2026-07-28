import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

import "./Navbar.css";

import logo from "../../../assets/images/logo.png";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 80);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (

        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

            <div className="navbar-container">

                <a href="#inicio" className="navbar-logo">

                    <img
                        src={logo}
                        alt="Gama Pizza"
                    />

                </a>

                <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>

                    <a href="#inicio" onClick={closeMenu}>
                        Início
                    </a>

                    <a href="#historia" onClick={closeMenu}>
                        História
                    </a>

                    <a href="#rodizios" onClick={closeMenu}>
                        Rodízios
                    </a>

                    <a href="#galeria" onClick={closeMenu}>
                        Galeria
                    </a>

                    <a href="#contato" onClick={closeMenu}>
                        Contato
                    </a>

                </nav>

                <a
                    href="https://wa.me/5543984483051"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar-button"
                >

                    <FaWhatsapp />

                    Reservar Mesa

                </a>

                <button
                    className="navbar-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir Menu"
                >

                    {menuOpen ? <FaTimes /> : <FaBars />}

                </button>

            </div>

        </header>

    );

}

export default Navbar;