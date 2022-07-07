import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SEARCH_USERS_QUERY } from "../../GraphQL/Queries/userQueries";
import useFetch from "../../Hooks/useFetch";
import Spinner from "../../Ui/Spinner";
import FocusTrapRedirectFocus from "../FocusTrap";
import { ISearchResult } from "../SearchBar/SearchBar";
import "./MobileSearchBar.scss";

interface Props {
  toggleMobileSearch: () => void;
}

const MobileSearchBar = (props: Props) => {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

  const [noResultsMessage, setNoResultsMessage] = useState("");

  const [searchRequest, { isLoading }] = useFetch({
    query: SEARCH_USERS_QUERY,
    variables: { query: query.toLowerCase() },
  });

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  let timeout = useRef<any>();

  useEffect(() => {
    if (query.length <= 2) {
      setSearchResults([]);
      clearTimeout(timeout.current);
    }
    if (query.length > 2) handleSearch();
  }, [query]);

  useEffect(() => {
    return () => {
      const lastBtnFocused = document.getElementById(
        "navbar-toggle-mobile-search"
      );
      lastBtnFocused?.focus();
    };
  }, []);

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
    <div className="mobileSearchBar">
      <FocusTrapRedirectFocus element={lastFocusableElement} />
      <div
        className="mobileSearchBar__backdrop"
        onClick={props.toggleMobileSearch}
      ></div>
      <div className="mobileSearchBar__container">
        <div className="mobileSearchBar__topBar">
          <button
            onClick={props.toggleMobileSearch}
            aria-label="Close search modal"
            className="mobileSearchBar__closeBtn"
            ref={firstFocusableElement}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mobileSearchBar__input"
          ref={searchResults.length === 0 ? lastFocusableElement : undefined}
        />
        {query.length > 2 && (
          <div className="mobileSearchBar__results">
            {query.length > 2 &&
              searchResults.length === 0 &&
              !noResultsMessage && <Spinner size="small" />}
            {!isLoading &&
              searchResults?.length > 0 &&
              searchResults.map((user, index) => {
                return (
                  <div className="search__result" key={user.id}>
                    <Link
                      to={`/users/${user.username}`}
                      ref={
                        index === searchResults.length - 1
                          ? lastFocusableElement
                          : null
                      }
                      onClick={props.toggleMobileSearch}
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
            {noResultsMessage && <p>{noResultsMessage}</p>}
          </div>
        )}
      </div>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </div>
  );
};

export default MobileSearchBar;
