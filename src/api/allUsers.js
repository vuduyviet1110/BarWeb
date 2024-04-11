import { request } from "../utils/request";

request.get("/").then((response) => {
  console.log(response);
});
