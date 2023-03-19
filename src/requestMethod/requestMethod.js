import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const myApi = API;
myApi.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export { myApi };
