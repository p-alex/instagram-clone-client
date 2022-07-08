import "./SearchBar.scss";
import { useEffect, useRef, useState } from "react";
import { SEARCH_USERS_QUERY } from "../../GraphQL/Queries/userQueries";
import useFetch from "../../Hooks/useFetch";
import Spinner from "../../Ui/Spinner";
import { Link } from "react-router-dom";

export interface ISearchResult {
  id: string;
  username: string;
  profilePicture: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  const [noResultsMessage, setNoResultsMessage] = useState("");

  const [searchRequest, { isLoading }] = useFetch({
    query: SEARCH_USERS_QUERY,
    variables: { query: query.toLowerCase() },
  });

  let timeout = useRef<any>();

  useEffect(() => {
    if (query.length <= 2) {
      setSearchResults([]);
      clearTimeout(timeout.current);
    }
    if (query.length > 2) handleSearch();
  }, [query]);

  const handleSearch = async () => {
    setSearchResults([]);
    setNoResultsMessage("");
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      try {
        const response = await searchRequest();
        if (response.success) {
          if (response.results.length === 0) {
            setNoResultsMessage("No results");
            return;
          }
          setSearchResults(response.results);
        }
      } catch (error) {
        console.log(error);
      }
    }, 600);
  };

  return (
    <div className="search">
      <div className="search__container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="search__input"
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {query.length > 2 && (
        <div className="search__results">
          {query.length > 2 &&
            searchResults.length === 0 &&
            !noResultsMessage && <Spinner size="small" />}
          {!isLoading &&
            searchResults?.length > 0 &&
            searchResults.map((user) => {
              return (
                <div className="search__result" key={user.id}>
                  <Link
                    to={`/users/${user.username}`}
                    onClick={() => setQuery("")}
                  >
                    <img
                      src={user.profilePicture}
                      alt=""
                      width={35}
                      height={35}
                    />
                    <p>{user.username}</p>
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
