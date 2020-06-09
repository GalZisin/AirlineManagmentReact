import React from "react";
import SearchResults from '../components/SearchResults';
import SearchFlights from '../components/SearchFlights';
import './SearchFlightsBox.css';

function Search() {
    return (
        <div>
          <SearchFlights/>
          <SearchResults/>
        </div>
    );
}
export default Search;