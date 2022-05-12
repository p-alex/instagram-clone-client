import { useSelector } from "react-redux";
import CreatePostModal from "../Components/CreatePostModal/CreatePostModal";
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
    </>
  );
};

export default Layout;
