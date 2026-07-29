import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer/Footer.jsx";

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
