import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Suggestions from "../../Components/Suggestions/Suggestions";
import Layout from "../../Layout/Layout";
import "./SuggestionsPage.scss";

function SuggestionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Bubble</title>
      </Helmet>
      <Suggestions type={"big"} />
    </Layout>
  );
}

export default SuggestionsPage;
