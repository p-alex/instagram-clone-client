import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import SuggestionBox from "./SuggestionBox/SuggestionBox";
import "./SuggestionsSlider.scss";

const SuggestionsSlider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [boxesPerSlide, setBoxesPerSlide] = useState(3);
  const suggestions = useSelector(
    (state: RootState) => state.suggestions.suggestions
  );

  const checkWindowSize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 480) {
      setBoxesPerSlide(2.5);
      return;
    }

    if (windowWidth <= 980) {
      setBoxesPerSlide(3);
      return;
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  const handleMoveSlider = (direction: "left" | "right") => {
    if (direction === "left") {
      if (sliderIndex - 1 >= 0) {
        setSliderIndex((prevState) => prevState - 1);
      }
    } else if (direction === "right" && suggestions) {
      if (sliderIndex + 1 <= Math.round(suggestions.length / boxesPerSlide)) {
        setSliderIndex((prevState) => prevState + 1);
      }
    }
  };
  return (
    <>
      {suggestions && suggestions.length >= 4 && (
        <section className="suggestionsSlider">
          <header className="suggestionsSlider__header">
            <h2 className="suggestionsSlider__title">Suggestions for you</h2>
            <Link to="/suggestions" className="suggestionsSlider__seeAllLink">
              See all
            </Link>
          </header>
          <div className="suggestionsSlider__rowContainer">
            {sliderIndex !== 0 && (
              <button
                className="suggestionsSlider__ctrl ctrl-left"
                onClick={() => handleMoveSlider("left")}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            )}
            <div
              className="suggestionsSlider__row"
              style={{
                transform: `translateX(calc(-${sliderIndex * 100}%))`,
              }}
            >
              {suggestions?.map((suggestion) => {
                return (
                  <SuggestionBox
                    key={`suggestionBox-${suggestion.username}`}
                    boxesPerSlide={boxesPerSlide}
                    id={suggestion.id}
                    username={suggestion.username}
                    profilePicture={suggestion.profilePicture}
                    isFollowed={suggestion.isFollowed}
                  />
                );
              })}
            </div>
            {sliderIndex !==
              Math.floor(suggestions!.length / boxesPerSlide) && (
              <button
                className="suggestionsSlider__ctrl ctrl-right"
                onClick={() => handleMoveSlider("right")}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SuggestionsSlider;
