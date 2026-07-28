import "./Gallery.css";


import pizza1 from "../../../assets/images/gallery/pizza1.jpg";
import pizza2 from "../../../assets/images/gallery/pizza2.jpg";
import evento1 from "../../../assets/images/gallery/evento1.jpg";
import evento2 from "../../../assets/images/gallery/evento2.jpg";
import equipe from "../../../assets/images/gallery/equipe.jpg";



function Gallery(){


    const images=[

        {
            image:evento1,
            title:"Eventos especiais"
        },


        {
            image:pizza1,
            title:"Pizzas artesanais"
        },


        {
            image:evento2,
            title:"Rodízios completos"
        },


        {
            image:pizza2,
            title:"Sabores exclusivos"
        },


        {
            image:equipe,
            title:"Nossa equipe"
        }


    ];



    return(


        <section 
            className="gallery"
            id="galeria"
        >


            <div className="gallery-container">


                <div className="gallery-header">


                    <span>
                        Galeria
                    </span>


                    <h2>
                        Momentos que
                        fazem história
                    </h2>


                    <p>

                        Confira alguns momentos
                        da experiência Gama Pizzas.

                    </p>


                </div>



                <div className="gallery-grid">


                    {

                        images.map((item,index)=>(


                            <div

                                className="gallery-item"

                                key={index}

                                data-aos="zoom-in"

                                data-aos-delay={index * 100}

                            >


                                <img
                                    src={item.image}
                                    alt={item.title}
                                />


                                <div className="gallery-overlay">


                                    <h3>
                                        {item.title}
                                    </h3>


                                </div>


                            </div>


                        ))

                    }


                </div>


            </div>


        </section>


    );

}


export default Gallery;