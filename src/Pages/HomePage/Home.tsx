import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Feed from "../../Components/Feed/Feed";
import Footer from "../../Components/Footer/Footer";
import Suggestions from "../../Components/Suggestions/Suggestions";
import UsernameAndName from "../../Components/UsernameAndName/UsernameAndName";
import FeedContextProvider from "../../Context/FeedContext";

import Layout from "../../Layout/Layout";
import { RootState } from "../../Redux/Store";
import "./Home.scss";

const Home = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.user?.id) {
      navigate("/login");
    }
  }, [authState.user, navigate]);

  return (
    <Layout>
      {!authState.user?.hasFollowings && <Suggestions type={"big"} />}
      {authState.user?.hasFollowings && (
        <div className="homeContainer">
          <FeedContextProvider>
            <Feed />
          </FeedContextProvider>
          <aside className="homeContainer__sidePanel">
            <div className="homeContainer__sidePanelContainer">
              <UsernameAndName
                username={authState.user.username}
                fullname={authState.user.fullname}
                profilePicture={authState.user.profilePicture.smallPicture}
              />
              <Suggestions type={"small"} />
              <Footer />
            </div>
          </aside>
        </div>
      )}
    </Layout>
  );
};

export default Home;
