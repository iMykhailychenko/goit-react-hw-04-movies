import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Loader from 'react-loader-spinner';
import styles from './Reviews.module.css';
import { moviesFetch } from '../Utils/dataFetch';
import { KEY, structuringDatatFromeFetchReviews } from '../Utils/helpers';

export default class Reviews extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  state = {
    reviews: [],
    isLoading: false,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    const params = `movie/${movieId}/reviews`;

    this.setState({ isLoading: true });

    moviesFetch(KEY, params).then(({ results }) => {
      if (results.lenght) return;
      const reviewsInfo = structuringDatatFromeFetchReviews(results);

      this.setState({ reviews: [...reviewsInfo], isLoading: false });
    });
  }

  render() {
    const { reviews, isLoading } = this.state;

    return isLoading ? (
      <Loader
        className="Loader"
        type="Oval"
        color="#00BFFF"
        height={60}
        width={60}
        timeout={100}
      />
    ) : !reviews.length ? (
      <div className={styles.noReviews}>
        <span>We don't have any reviews for this movie.</span>
      </div>
    ) : (
      <ul className={styles.list}>
        {reviews.map(({ author, content, id }) => (
          <li className={styles.item} key={id}>
            <h5 className={styles.title}>{author}</h5>
            <p className={styles.text}>{content}</p>
          </li>
        ))}
      </ul>
    );
  }
}
