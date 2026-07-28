import "./Footer.css";


function Footer(){

    return(

        <footer className="footer">


            <div className="footer-container">


                <h2>
                    Gama Pizza
                </h2>


                <p>
                    Uma experiência única em rodízio de pizzas.
                </p>


                <p>
                    © {new Date().getFullYear()} Gama Pizza.
                    Todos os direitos reservados.
                </p>


            </div>


        </footer>

    );

}


export default Footer;