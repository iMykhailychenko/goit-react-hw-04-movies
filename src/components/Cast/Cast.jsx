import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Loader from 'react-loader-spinner';
import styles from './Cast.module.css';
import { moviesFetch } from '../Utils/dataFetch';

const KEY = '9d6e1ea09b630bd9f25250a95c28140d';
const structuringDatatFromeFetch = cast => {
  return cast.map(({ profile_path, character, name, id }) => ({
    profilePath: profile_path
      ? 'http://image.tmdb.org/t/p/w400' + profile_path
      : 'https://avatars1.githubusercontent.com/u/50461642?s=460&u=e4541a6f950423de3a013e3776c493dd9b9f0300&v=4',
    character,
    name,
    id,
  }));
};

export default class Cast extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  state = {
    cast: [],
    isLoading: false,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    const params = `movie/${movieId}/credits`;

    this.setState({ isLoading: true });

    moviesFetch(KEY, params).then(({ cast }) => {
      const castInfo = structuringDatatFromeFetch(cast);

      this.setState({ cast: [...castInfo], isLoading: false });
    });
  }

  render() {
    const { cast, isLoading } = this.state;

    return isLoading ? (
      <Loader
        className="Loader"
        type="Oval"
        color="#00BFFF"
        height={60}
        width={60}
        timeout={100}
      />
    ) : (
      <ul className={styles.list}>
        {cast.map(({ profilePath, character, name, id }) => (
          <li className={styles.item} key={id}>
            {profilePath && (
              <img className={styles.img} src={profilePath} alt="" />
            )}
            <span className={styles.name}>Character: {character}</span>
            <br />
            <span className={styles.name}>Name: {name}</span>
          </li>
        ))}
      </ul>
    );
  }
}
