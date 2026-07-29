import NavBar from "./NavBar/NavBar.jsx";
import Footer from "./Footer/Footer.jsx";
import WhatsAppFloatButton from "../common/WhatsAppFloatButton/WhatsAppFloatButton";

function MainLayout({ children }) {
  return (
    <>
      <NavBar />

      <main id="main-content">{children}</main>

      <Footer />

      <WhatsAppFloatButton />
    </>
  );
}

export default MainLayout;
