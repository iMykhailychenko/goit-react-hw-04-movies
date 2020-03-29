import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Loader from 'react-loader-spinner';
import styles from './Cast.module.css';
import { moviesFetch } from '../Utils/dataFetch';
import { KEY, structuringDatatFromeFetchCast } from '../Utils/helpers';

export default class Cast extends Component {
  static propTypes = {
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
      const castInfo = structuringDatatFromeFetchCast(cast);

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
