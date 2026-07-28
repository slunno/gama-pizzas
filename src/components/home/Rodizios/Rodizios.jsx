import { flavors } from "../../../data/FlavorsData";

import { buildWhatsAppLink } from "../../../utils/whatsapp";

import "./Rodizios.css";

import {
    FaPizzaSlice,
    FaHamburger,
    FaUsers,
    FaChild,
    FaWhatsapp
} from "react-icons/fa";



const menus = [

    {
        title: "Rodízio de Pizzas - Cardápio 1",
        icon: <FaPizzaSlice />,
        price: "R$ 55,00",
        child: "R$ 27,00",
        flavors: "20 sabores de pizzas (salgadas e doces)",
        minimum: "Mínimo de 30 adultos ou R$ 1.650,00",
        highlight: false
    },


    {
        title: "Rodízio de Pizzas - Cardápio 2",
        icon: <FaPizzaSlice />,
        price: "R$ 60,00",
        child: "R$ 30,00",
        flavors: "30 sabores de pizzas (salgadas e doces)",
        minimum: "Mínimo de 25 adultos ou R$ 1.500,00",
        highlight: true
    },


    {
        title: "Pizza + Mini Hambúrguer - Cardápio 1",
        icon: <FaHamburger />,
        price: "R$ 60,00",
        child: "R$ 30,00",
        flavors: "20 sabores de pizzas + mini hambúrguer + batata frita",
        minimum: "Mínimo de 30 adultos ou R$ 1.800,00",
        highlight: false
    },


    {
        title: "Pizza + Mini Hambúrguer - Cardápio 2",
        icon: <FaHamburger />,
        price: "R$ 65,00",
        child: "R$ 33,00",
        flavors: "30 sabores de pizzas + mini hambúrguer + batata frita",
        minimum: "Mínimo de 25 adultos ou R$ 1.625,00",
        highlight: true
    },


    {
        title: "Rodízio de Mini Hambúrguer",
        icon: <FaHamburger />,
        price: "R$ 55,00",
        child: "R$ 27,00",
        flavors:
        "Mini hambúrguer, mini hot dog, batata frita e mini churros",
        minimum:
        "Consulte condições para seu evento",
        highlight: false
    }

];



function Rodizios() {


    return (

        <section
            className="rodizios"
            id="rodizios"
        >


            <div className="rodizios-container">



                <div className="section-header">


                    <span>
                        Nossos Cardápios
                    </span>


                    <h2>
                        Escolha a melhor opção
                        para o seu evento
                    </h2>


                    <p>

                        Levamos toda a estrutura necessária:
                        forno, ingredientes, pizzaiolo e equipe
                        preparada para transformar seu evento
                        em uma experiência inesquecível.

                    </p>


                </div>




                <div className="menu-grid">


                    {
                        menus.map((menu,index)=>(


                            <div

                                className={
                                    `menu-card ${
                                    menu.highlight
                                    ? "highlight"
                                    : ""
                                    }`
                                }

                                key={index}

                            >



                                {
                                    menu.highlight &&

                                    (

                                        <div className="badge">

                                            Mais escolhido

                                        </div>

                                    )
                                }





                                <div className="menu-icon">

                                    {menu.icon}

                                </div>




                                <h3>

                                    {menu.title}

                                </h3>




                                <div className="price">


                                    {menu.price}


                                    <small>

                                        adulto

                                    </small>


                                </div>




                                <div className="info">


                                    <p>

                                        <FaChild />

                                        Criança:
                                        {menu.child}

                                    </p>




                                    <p>

                                        <FaPizzaSlice />

                                        {menu.flavors}

                                    </p>




                                    <p>

                                        <FaUsers />

                                        {menu.minimum}

                                    </p>



                                </div>





                                <a

                                    href={buildWhatsAppLink(
                                        `Olá! Gostaria de solicitar um orçamento para o ${menu.title} (${menu.price} por adulto).`
                                    )}

                                    target="_blank"

                                    rel="noopener noreferrer"

                                    className="menu-button"

                                >


                                    <FaWhatsapp />


                                    Solicitar orçamento


                                </a>




                            </div>


                        ))

                    }


                </div>






                <div className="flavors-section">



                    <div className="flavors-header">


                        <span>
                            Sabores disponíveis
                        </span>


                        <h2>
                            Conheça nossos sabores
                        </h2>


                        <p>

                            Trabalhamos com opções salgadas
                            e doces para deixar seu evento completo.

                        </p>


                    </div>





                    <div className="flavors-grid">



                        {

                            Object.values(flavors).map((menu,index)=>(


                                <div

                                    className="flavors-card"

                                    key={index}

                                >



                                    <h3>

                                        🍕 {menu.title}

                                    </h3>




                                    <h4>

                                        Pizzas Salgadas

                                    </h4>



                                    <div className="chips">


                                        {

                                            menu.salty.map((item)=>(


                                                <span

                                                    key={item}

                                                >

                                                    {item}

                                                </span>


                                            ))

                                        }


                                    </div>




                                    <h4>

                                        🍫 Pizzas Doces

                                    </h4>




                                    <div className="chips">


                                        {

                                            menu.sweet.map((item)=>(


                                                <span

                                                    key={item}

                                                >

                                                    {item}

                                                </span>


                                            ))

                                        }


                                    </div>




                                </div>


                            ))

                        }


                    </div>


                </div>




            </div>


        </section>

    );

}


export default Rodizios;
