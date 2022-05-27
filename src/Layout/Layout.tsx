import { useSelector } from "react-redux";
import CreatePostModal from "../Components/CreatePostModal/CreatePostModal";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import { NavBarContextProvider } from "../Context/NavBarContext";
import "./Layout.scss";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <NavBarContextProvider>
        <NavBar />
      </NavBarContextProvider>
      <main className="mainContainer">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
