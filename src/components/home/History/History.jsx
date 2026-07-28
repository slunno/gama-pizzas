import "./History.css";
import historyImage from "../../../assets/images/history.jpg";
import { FaPizzaSlice, FaUsers, FaHeart } from "react-icons/fa";

function History() {
    return (
        <section className="history" id="historia">

            <div className="history-container">

                <div className="history-image">

                    <img
                        src={historyImage}
                        alt="Gama Pizza"
                    />

                </div>

                <div className="history-content">

                    <span className="section-tag">
                        Nossa História
                    </span>

                    <h2>
                        Tradição, sabor e momentos inesquecíveis.
                    </h2>

                    <p>
                        A Gama Pizza nasceu com um propósito simples:
                        proporcionar uma experiência completa para quem ama
                        uma boa pizza. Com ingredientes selecionados,
                        atendimento acolhedor e um ambiente familiar,
                        conquistamos clientes que hoje fazem parte da nossa história.
                    </p>

                    <p>
                        Nosso rodízio reúne pizzas salgadas, doces,
                        massas e diversas opções preparadas diariamente,
                        sempre buscando qualidade em cada detalhe.
                    </p>

                    <div className="history-cards">

                        <div className="history-card">
                            <FaPizzaSlice />
                            <h3>Receitas Exclusivas</h3>
                            <p>Sabores preparados com ingredientes selecionados.</p>
                        </div>

                        <div className="history-card">
                            <FaUsers />
                            <h3>Ambiente Familiar</h3>
                            <p>Um espaço perfeito para reunir amigos e família.</p>
                        </div>

                        <div className="history-card">
                            <FaHeart />
                            <h3>Feito com Paixão</h3>
                            <p>Cada pizza é preparada com dedicação e carinho.</p>
                        </div>

                    </div>

                    <a
                        href="#rodizios"
                        className="history-button"
                    >
                        Conheça nossos Rodízios
                    </a>

                </div>

            </div>

        </section>
    );
}

export default History;