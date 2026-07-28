import { useEffect, useState } from "react";

import {
    FaBars,
    FaTimes,
    FaWhatsapp
} from "react-icons/fa";


import logo from "../../../assets/images/logo.png";

import { buildWhatsAppLink } from "../../../utils/whatsapp";

import "./NavBar.css";


function Navbar(){

    const [menuOpen,setMenuOpen] = useState(false);

    const [scrolled,setScrolled] = useState(false);



    useEffect(()=>{


        const handleScroll = ()=>{

            setScrolled(window.scrollY > 80);

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        return ()=>{

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };


    },[]);



    useEffect(()=>{


        document.body.style.overflow =
        menuOpen
        ?
        "hidden"
        :
        "auto";


        return ()=>{

            document.body.style.overflow="auto";

        };


    },[menuOpen]);



    const closeMenu = ()=>{

        setMenuOpen(false);

    };



    return(

        <header
            className={`navbar ${
                scrolled ? "scrolled" : ""
            }`}
        >


            <div className="navbar-container">


                <a
                    href="#inicio"
                    className="navbar-logo"
                    onClick={closeMenu}
                >

                    <img
                        src={logo}
                        alt="Gama Pizzas"
                    />

                </a>




                <nav
                    className={`navbar-menu ${
                        menuOpen ? "active" : ""
                    }`}
                >


                    <a
                        href="#inicio"
                        onClick={closeMenu}
                    >
                        Início
                    </a>


                    <a
                        href="#historia"
                        onClick={closeMenu}
                    >
                        História
                    </a>


                    <a
                        href="#rodizios"
                        onClick={closeMenu}
                    >
                        Rodízios
                    </a>


                    <a
                        href="#galeria"
                        onClick={closeMenu}
                    >
                        Galeria
                    </a>


                    <a
                        href="#contato"
                        onClick={closeMenu}
                    >
                        Contato
                    </a>


                </nav>



                {
                    menuOpen && (

                        <div
                            className="navbar-overlay"
                            onClick={closeMenu}
                        />

                    )
                }




                <a
                    href={buildWhatsAppLink(
                        "Olá! Gostaria de solicitar um orçamento para o rodízio da Gama Pizzas."
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="navbar-button"
                >

                    <FaWhatsapp/>

                    Orçamento

                </a>





                <button
                    className="navbar-toggle"
                    onClick={()=>setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >

                    {
                        menuOpen
                        ?
                        <FaTimes/>
                        :
                        <FaBars/>
                    }


                </button>



            </div>


        </header>

    );

}


export default Navbar;