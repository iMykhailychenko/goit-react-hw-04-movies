import React, { Component, lazy, Suspense, createRef } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Loader from 'react-loader-spinner';
import { moviesFetch } from '../../Utils/dataFetch';
import { KEY } from '../../Utils/helpers';
import styles from './MovieDetailsPage.module.css';

const AsyncReviews = lazy(() =>
  import('../../Reviews/Reviews' /* webpackChunkName: "reviews" */),
);
const AsyncCast = lazy(() =>
  import('../../Cast/Cast' /* webpackChunkName: "Ccst" */),
);
const FETCHPARAMS = 'movie/';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  toTopBtnRef = createRef();

  state = {};

  componentDidMount() {
    const { movieId } = this.props.match.params;

    moviesFetch(KEY, FETCHPARAMS + movieId).then(
      ({ poster_path, title, popularity, overview, genres }) => {
        this.setState({
          posterPath: 'http://image.tmdb.org/t/p/w400' + poster_path,
          title,
          popularity,
          overview,
          genres,
        });
      },
    );

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    const { current } = this.toTopBtnRef;
    const { scrollY } = e.srcElement.defaultView;

    if (scrollY > 400) {
      current.style.bottom = '20px';
    } else {
      current.style.bottom = '-110%';
    }
  };

  handleClick = () => {
    const { history } = this.props;
    const { state } = this.props.location;
    const newState = state ? state : { pathname: '/' };

    history.push({
      ...newState,
    });
  };

  handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { posterPath, title, popularity, overview, genres } = this.state;
    const { url, path } = this.props.match;

    return (
      <div className="container">
        <img className="wall" src={posterPath} alt="" />

        <button className={styles.btn} type="button" onClick={this.handleClick}>
          Go back
        </button>

        <button
          className={styles.top}
          type="button"
          onClick={this.handleTop}
          ref={this.toTopBtnRef}
        >
          go to top
        </button>

        <div>
          <img src={posterPath} alt="" />

          <h2 className="title-2">{title}</h2>
          <p>User score: {popularity}</p>

          <h3 className="title-3">Overview</h3>
          <p>{overview}</p>

          <h4 className="title-4">General</h4>
          {genres &&
            genres.map(item => (
              <span className={styles.genres} key={item.id}>
                {item.name}
              </span>
            ))}
        </div>

        <div className={styles.aditional}>
          <h5 className="title-5">Aditional information</h5>
          <ul className={styles.tabList}>
            <li>
              <Link
                className={styles.tab}
                to={{
                  pathname: `${url}/cast`,
                  state: this.props.location.state,
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                className={styles.tab}
                to={{
                  pathname: `${url}/reviews`,
                  state: this.props.location.state,
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Suspense
          fallback={
            <Loader
              className="Loader"
              type="Oval"
              color="#00BFFF"
              height={60}
              width={60}
              timeout={100}
            />
          }
        >
          <Route path={`${path}/reviews`} component={AsyncReviews} />
          <Route path={`${path}/cast`} component={AsyncCast} />
        </Suspense>
      </div>
    );
  }
}
