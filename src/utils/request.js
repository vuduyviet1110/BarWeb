import axios from "axios";

export const request = axios.create({
  baseURL: "https://barweb-api.onrender.com",
});
