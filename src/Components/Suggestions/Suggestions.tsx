import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GET_SUGGESTIONS_QUERY } from "../../GraphQL/Queries/suggestionsQueries";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { setSuggestions } from "../../Redux/Suggestions";
import Suggestion from "./Suggestion/Suggestion";
import "./Suggestions.scss";

interface Props {
  // small means max 5 suggestions
  // big means max 25 suggestions
  type: "small" | "big";
}

const Suggestions = (props: Props) => {
  const { authState, suggestionsState, dispatch } = useRedux();

  const [getSuggestionsRequest, { isLoading }] = useFetchWithRetry({
    query: GET_SUGGESTIONS_QUERY,
    variables: {},
    accessToken: authState.accessToken,
  });

  const handleGetSuggestions = async () => {
    try {
      const response = await getSuggestionsRequest();
      if (response.success) {
        dispatch(setSuggestions(response?.suggestions));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!suggestionsState.suggestions) handleGetSuggestions();
  }, []);

  return (
    <>
      {suggestionsState.suggestions && suggestionsState.suggestions.length > 0 && (
        <div className="suggestions">
          <div className="suggestions__header">
            <p>Suggestions for you</p>
            {props.type === "small" && (
              <Link
                to="/suggestions"
                className="suggestions__seeAllLink"
                aria-label="See all suggestions."
              >
                See all
              </Link>
            )}
          </div>
          {!isLoading &&
            suggestionsState.suggestions &&
            suggestionsState.suggestions.map((suggestion, index) => {
              if (props.type === "small") {
                if (index < 5)
                  return (
                    <Suggestion
                      key={suggestion.id}
                      suggestion={suggestion}
                      suggestionIndex={index}
                      isFollowed={suggestion.isFollowed}
                    />
                  );
              } else {
                if (index < 25)
                  return (
                    <Suggestion
                      key={suggestion.id}
                      suggestion={suggestion}
                      suggestionIndex={index}
                      isFollowed={suggestion.isFollowed}
                    />
                  );
              }
            })}
        </div>
      )}
    </>
  );
};

export default Suggestions;
