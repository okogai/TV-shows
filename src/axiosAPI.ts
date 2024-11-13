import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://api.tvmaze.com/shows/",
});

export default axiosAPI;
