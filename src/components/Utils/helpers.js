const KEY = '9d6e1ea09b630bd9f25250a95c28140d';

const structuringDatatFromeFetch = results => {
  return results.map(({ title, id }) => {
    const correctTitle = title.length < 40 ? title : title.slice(0, 40) + '...';
    return { title: correctTitle, id };
  });
};

const structuringDatatFromeFetchCast = cast => {
  return cast.map(({ profile_path, character, name, id }) => ({
    profilePath: profile_path
      ? 'http://image.tmdb.org/t/p/w400' + profile_path
      : 'https://avatars1.githubusercontent.com/u/50461642?s=460&u=e4541a6f950423de3a013e3776c493dd9b9f0300&v=4',
    character,
    name,
    id,
  }));
};

const structuringDatatFromeFetchReviews = results => {
  return results.map(({ author, content, id }) => ({
    author,
    content,
    id,
  }));
};

export {
  KEY,
  structuringDatatFromeFetch,
  structuringDatatFromeFetchCast,
  structuringDatatFromeFetchReviews,
};
