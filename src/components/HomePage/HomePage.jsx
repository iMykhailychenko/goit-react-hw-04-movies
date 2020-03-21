// react
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

// components
import Loader from 'react-loader-spinner';
import MoviesList from '../MoviesList/MoviesList';

// utils
import { moviesFetch } from '../Utils/dataFetch';

// styles
import styles from './HomePage.module.css';

// other
import wall from './front-page.jpg';

const KEY = '9d6e1ea09b630bd9f25250a95c28140d';
const FETCHPARAMS = 'trending/movie/day';
const structuringDatatFromeFetch = results => {
  return results.map(({ title, id }) => {
    const correctTitle = title.length < 40 ? title : title.slice(0, 40) + '...';
    return { title: correctTitle, id };
  });
};

export default class HomePage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  state = {
    movies: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    moviesFetch(KEY, FETCHPARAMS).then(({ results }) => {
      const dataForHomePage = structuringDatatFromeFetch(results);
      this.setState({ movies: [...dataForHomePage], isLoading: false });
    });
  }

  render() {
    const { movies, isLoading } = this.state;
    const { location } = this.props;

    return isLoading ? (
      <div className="container">
        <img className="wall" src={wall} alt="" />
        <h1 className={styles.title}>Trending today</h1>
        <Loader
          className="Loader"
          type="Oval"
          color="#00BFFF"
          height={60}
          width={60}
          timeout={300}
        />
      </div>
    ) : (
      <div className="container">
        <img className="wall" src={wall} alt="" />
        <h1 className={styles.title}>Trending today</h1>
        <MoviesList movieInfo={movies} location={location} />
      </div>
    );
  }
}
