import { useEffect, useState } from "react";

import {
    FaBars,
    FaTimes,
    FaWhatsapp
} from "react-icons/fa";


import logo from "../../../assets/images/logo.png";

import "./Navbar.css";



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
                    href="https://wa.me/5543984483051"
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