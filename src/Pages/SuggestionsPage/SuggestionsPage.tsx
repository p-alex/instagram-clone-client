import { useEffect } from "react";
import Suggestions from "../../Components/Suggestions/Suggestions";
import Layout from "../../Layout/Layout";
import "./SuggestionsPage.scss";

function SuggestionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Suggestions type={"big"} />
    </Layout>
  );
}

export default SuggestionsPage;
