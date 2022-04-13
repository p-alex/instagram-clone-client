import { useEffect } from 'react';
import { GET_SUGGESTIONS_QUERY } from '../../GraphQL/Queries/suggestionsQueries';
import useFetchWithRetry from '../../Hooks/useFetchWithRetry';
import useRedux from '../../Hooks/useRedux';
import { setSuggestions } from '../../Redux/Suggestions';
import './SuggestionsBig.scss';
import Suggestion from './SuggestionsBigComponents/Suggestion/Suggestion';

const SuggestionsBig = () => {
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
    handleGetSuggestions();
  }, []);

  return (
    <div className="suggestionsBig">
      <p>Suggestions for you</p>
      {!isLoading &&
        suggestionsState.suggestions &&
        suggestionsState.suggestions.map((suggestion) => {
          return <Suggestion key={suggestion.id} suggestion={suggestion} />;
        })}
    </div>
  );
};

export default SuggestionsBig;
