import axios from 'axios';

const moviesFetch = (key, params) => {
  return axios(`https://api.themoviedb.org/3/${params}?api_key=${key}`).then(
    response => response.data,
  );
};

const searchFetch = (key, query) => {
  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`,
  ).then(response => response.data);
};

export { moviesFetch, searchFetch };
