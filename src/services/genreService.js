import http from "./httpServices";

const apiEndPoint = "/genres";

export function getGenres() {
  return http.get(apiEndPoint); //.get('url'): send http request and get some data.
}
