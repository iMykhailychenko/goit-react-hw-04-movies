import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Navigation from './Navigation/Navigation';
import './App.module.css';

const AsyncHomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const AsyncMovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const AsyncMoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const AsyncNotFound = lazy(() =>
  import('./pages/NotFound/NotFound' /* webpackChunkName: "not-found" */),
);

export default class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Navigation />

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
          <Switch>
            <Route path="/" exact component={AsyncHomePage} />

            <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />

            <Route path="/movies" component={AsyncMoviesPage} />

            <Route component={AsyncNotFound} />
          </Switch>
        </Suspense>
      </>
    );
  }
}
