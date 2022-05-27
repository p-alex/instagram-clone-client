import { useEffect } from "react";
import { GET_SUGGESTIONS_QUERY } from "../../GraphQL/Queries/suggestionsQueries";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { setSuggestions } from "../../Redux/Suggestions";
import Suggestion from "./Suggestion/Suggestion";
import "./Suggestions.scss";

interface Props {
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
          <p>Suggestions for you</p>
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
