  import axios from "axios";

  const apiAuth = axios.create({
    baseURL: "http://20.41.121.191:5151/Api/",
    // baseURL: "http://20.197.12.48:3300/Api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  export default apiAuth;
