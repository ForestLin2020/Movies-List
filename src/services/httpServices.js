import axios from "axios";
import { toast } from "react-toastify";

// axios.defaults.baseURL will always prefix in website url
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// .use(response success => first function, response include error => second function)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 && // 404 OR 400
    error.response.status < 500;

  if (!expectedError) {
    // Unexpected (newwork down, server down, Database Down, bug)
    // - Console.log them
    // - Dispaly a generic and friendly error message
    console.log("Logging the Error", error);
    toast("An unexpected error occurred.");
    // toast.error("An unexpected error occurred.");
    // toast.warning("An unexpected error occurred.");
    // toast.info("An unexpected error occurred.");
    // toast.success("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  setJwt,
};
