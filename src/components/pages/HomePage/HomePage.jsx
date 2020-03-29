// react
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Loader from 'react-loader-spinner';
import MoviesList from '../../MoviesList/MoviesList';
import { moviesFetch } from '../../Utils/dataFetch';
import styles from './HomePage.module.css';
import wall from './front-page.jpg';
import { KEY, structuringDatatFromeFetch } from '../../Utils/helpers';

const FETCHPARAMS = 'trending/movie/day';

export default class HomePage extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
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
