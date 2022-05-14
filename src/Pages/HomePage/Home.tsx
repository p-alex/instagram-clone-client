import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuggestionsBig from "../../Components/SuggestionsBig/SuggestionsBig";
import Layout from "../../Layout/Layout";
import { RootState } from "../../Redux/Store";

const Home = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.user?.id) {
      navigate("/login");
    }
  }, [authState.user, navigate]);

  return (
    <Layout>{!authState.user?.hasFollowings && <SuggestionsBig />}</Layout>
  );
};

export default Home;
