import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

const SearchResults = ({ movieInfo, location }) => (
  <ul className="list">
    {movieInfo &&
      movieInfo.map(movie => (
        <li key={movie.id}>
          <Link
            className="link"
            to={{
              pathname: `movies/${movie.id}`,
              state: location,
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
  </ul>
);

SearchResults.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  movieInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SearchResults;
