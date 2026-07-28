import {
    FaPizzaSlice,
    FaFire,
    FaUsers
} from "react-icons/fa";


import "./History.css";


import pizzaImg from "../../../assets/images/pizza-background.png";



function History(){


    const highlights=[

        {
            icon:<FaPizzaSlice/>,
            title:"Pizza Artesanal",
            text:"Massas e sabores preparados com cuidado."
        },


        {
            icon:<FaFire/>,
            title:"Preparação na Hora",
            text:"Levamos estrutura completa para seu evento."
        },


        {
            icon:<FaUsers/>,
            title:"Momentos Especiais",
            text:"Transformamos festas em experiências."
        }

    ];



    return(


        <section 
            className="history"
            id="historia"
        >


            <div className="history-container">


                <div className="history-image">


                    <img 
                        src={pizzaImg}
                        alt="Pizza Gama"
                    />


                </div>



                <div className="history-content">


                    <span>
                        Nossa História
                    </span>


                    <h2>
                        Mais que pizzas,
                        criamos momentos
                    </h2>



                    <p>

                        A Gama Pizzas nasceu com o propósito
                        de levar uma experiência completa de
                        rodízio até eventos especiais.

                    </p>


                    <p>

                        Trabalhamos com ingredientes selecionados,
                        equipe preparada e estrutura própria para
                        transformar cada evento em uma lembrança
                        inesquecível.

                    </p>



                    <div className="history-highlights">


                    {

                        highlights.map((item,index)=>(


                            <div 
                                className="history-card"
                                key={index}
                            >

                                <div className="history-icon">

                                    {item.icon}

                                </div>


                                <div>

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <p>
                                        {item.text}
                                    </p>

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


export default History;