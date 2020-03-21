import React, { Component } from 'react';
import queryString from 'query-string';
import ReactRouterPropTypes from 'react-router-prop-types';

import Loader from 'react-loader-spinner';
import MoviesList from '../MoviesList/MoviesList';
import { searchFetch } from '../Utils/dataFetch';
import styles from './MoviesPage.module.css';
import wall from './movies.jpg';

const KEY = '9d6e1ea09b630bd9f25250a95c28140d';
const structuringDatatFromeFetch = results => {
  return results.map(({ title, id }) => {
    const correctTitle = title.length < 40 ? title : title.slice(0, 40) + '...';
    return { title: correctTitle, id };
  });
};

export default class MoviesPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  state = {
    response: [],
    isLoading: false,
  };

  componentDidMount() {
    const { search } = this.props.location;
    const { query } = queryString.parse(search);
    if (!query) return;

    this.setState({ isLoading: true });

    searchFetch(KEY, query).then(({ results }) => {
      const dataForMarkup = structuringDatatFromeFetch(results);
      this.setState({ response: [...dataForMarkup], isLoading: false });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.props.location;
    const { query } = queryString.parse(search);
    if (!query) return;

    this.setState({ isLoading: true });

    searchFetch(KEY, query).then(({ results }) => {
      const dataForMarkup = structuringDatatFromeFetch(results);
      this.setState({ response: [...dataForMarkup], isLoading: false });
    });
  };

  handleInput = ({ target: { value } }) => {
    const query = value.split(' ').join('-');

    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { search } = this.props.location;
    const { query } = queryString.parse(search);
    const value = !query ? '' : query.split('-').join(' ');

    const { response, isLoading } = this.state;
    const { location } = this.props;

    return (
      <div className="container">
        <img className="wall" src={wall} alt="" />
        <form
          className={styles.form}
          method="post"
          onSubmit={this.handleSubmit}
        >
          <input
            className={styles.search}
            type="search"
            value={value}
            onChange={this.handleInput}
          />
          <input className={styles.submit} type="submit" />
        </form>
        {!!response.length &&
          (isLoading ? (
            <Loader
              className="Loader"
              type="Oval"
              color="#00BFFF"
              height={60}
              width={60}
              timeout={100}
            />
          ) : (
            <MoviesList movieInfo={response} location={location} />
          ))}
      </div>
    );
  }
}
