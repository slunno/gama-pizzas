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


        const scroll = ()=>{

            setScrolled(window.scrollY > 80);

        };


        window.addEventListener(
            "scroll",
            scroll
        );


        return ()=>{

            window.removeEventListener(
                "scroll",
                scroll
            );

        };


    },[]);




    return (

        <header
            className={`navbar ${
                scrolled ? "scrolled" : ""
            }`}
        >


            <div className="navbar-container">


                <a
                    href="#inicio"
                    className="navbar-logo"
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


                    <a href="#inicio">
                        Início
                    </a>


                    <a href="#historia">
                        História
                    </a>


                    <a href="#rodizios">
                        Rodízios
                    </a>


                    <a href="#galeria">
                        Galeria
                    </a>


                    <a href="#contato">
                        Contato
                    </a>


                </nav>



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