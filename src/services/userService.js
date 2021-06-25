import http from "./httpServices";

const apiEndPoint = "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.email,
    password: user.password, //.min(3)
    name: user.name, //.min(3)});
  });
}

// post: update
// .post(url, obj)
