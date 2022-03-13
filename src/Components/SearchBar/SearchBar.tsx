import './SearchBar.scss';
import { useState } from 'react';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const handleClearInput = () => setValue('');
  return (
    <div className="search">
      <div className="search__container">
        {/* <FontAwesomeIcon icon={faSearch} className="search__icon" /> */}
        <input
          className="search__input"
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          className="search__clearBtn"
          aria-label="clear search"
          disabled={!value}
          onClick={handleClearInput}
        >
          {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
