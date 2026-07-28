import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer/Footer.jsx";


function MainLayout({ children }) {

    return (
        <>
            <NavBar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );

}


export default MainLayout;