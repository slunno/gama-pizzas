import "./NavBar.css";

function NavBar() {

    return (
        <header className="navbar">

            <div className="navbar-container">

                <div className="navbar-logo">
                    Gama Pizza
                </div>


                <nav className="navbar-menu">

                    <a href="#inicio">
                        Início
                    </a>

                    <a href="#historia">
                        Nossa História
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


            </div>

        </header>
    );
}

export default NavBar;