import http from "./httpServices";

const apiEndPoint = "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  // response: {config: ... , data: ..., headers: ...}

  return http.get(apiEndPoint); //.get('url'): send http request and get some data.;
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
